import { DataAPIClient } from "@datastax/astra-db-ts";
import { OpenAIEmbeddings } from "@langchain/openai";
import { BaseRetriever } from "@langchain/core/retrievers";
import { Document } from "@langchain/core/documents";

const endpoint = process.env.ASTRA_DB_ENDPOINT || "";
const token = process.env.ASTRA_DB_APPLICATION_TOKEN || "";
const collectionName = process.env.ASTRA_DB_COLLECTION || "";

if (!token || !endpoint || !collectionName) {
  throw new Error(
    "Please set ASTRA_DB_ENDPOINT, ASTRA_DB_APPLICATION_TOKEN, and ASTRA_DB_COLLECTION environment variables.",
  );
}

const client = new DataAPIClient(token);
const db = client.db(endpoint);

// One shared embeddings client — used both to index content (`generate.ts`)
// and to embed incoming chat queries at retrieval time.
export const embeddings = new OpenAIEmbeddings({
  modelName: "text-embedding-3-small",
});

// Shape of a single indexed chunk. `content` + `$vector` are required;
// everything else is free-form metadata carried over from portfolioConfig.ts
// (see generate.ts) and surfaced back on `Document.metadata` at query time.
export interface PortfolioChunk {
  content: string;
  url: string;
  type?: string;
  title?: string;
  link?: string;
  role?: string;
  company?: string;
}

export function getCollection() {
  return db.collection<PortfolioChunk>(collectionName);
}

export async function clearCollection() {
  await getCollection().deleteMany({});
}

export async function insertChunks(
  chunks: { pageContent: string; metadata: Record<string, unknown> }[],
) {
  if (chunks.length === 0) return;

  const vectors = await embeddings.embedDocuments(
    chunks.map((chunk) => chunk.pageContent),
  );

  await getCollection().insertMany(
    chunks.map(
      (chunk, i) =>
        ({
          content: chunk.pageContent,
          $vector: vectors[i],
          ...chunk.metadata,
        }) as unknown as PortfolioChunk,
    ),
  );
}

// Fills the gap left by @langchain/community's (now-sunset) AstraDBVectorStore:
// a hand-written retriever that queries Astra DB directly via astra-db-ts,
// while still plugging into LangChain's LCEL as a first-party retriever would.
export class AstraRetriever extends BaseRetriever {
  lc_namespace = ["astradb", "retrievers"];

  constructor(private k = 4) {
    super();
  }

  async _getRelevantDocuments(query: string): Promise<Document[]> {
    const queryVector = await embeddings.embedQuery(query);

    const hits = await getCollection()
      .find({})
      .sort({ $vector: queryVector })
      .includeSimilarity(true)
      .limit(this.k)
      .toArray();

    return hits.map(({ content, ...metadata }) => {
      // _id and $similarity ride along on the raw hit; drop $vector (never
      // requested back) and keep the rest as document metadata.
      delete (metadata as Record<string, unknown>)._id;
      return new Document({ pageContent: content, metadata });
    });
  }
}
