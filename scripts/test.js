import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { OpenAIEmbeddings } from "@langchain/openai";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";

const astraConfig = {
  token: process.env.ASTRA_DB_APPLICATION_TOKEN,
  endpoint: process.env.ASTRA_DB_ENDPOINT,
  collection: process.env.ASTRA_DB_COLLECTION ?? "langchain_test",
  collectionOptions: {
    vector: {
      dimension: 1536,
      metric: "cosine",
    },
  },
};

const vectorStore = await AstraDBVectorStore.fromTexts(
  [
    "AstraDB is built on Apache Cassandra",
    "AstraDB is a NoSQL DB",
    "AstraDB supports vector search",
  ],
  [{ foo: "foo" }, { foo: "bar" }, { foo: "baz" }],
  new OpenAIEmbeddings({ modelName: "text-embedding-3-small" }),
  astraConfig,
);

// Querying docs:
const results = await vectorStore.similaritySearch("Cassandra", 1);

// or filtered query:
const filteredQueryResults = await vectorStore.similaritySearch("A", 1, {
  foo: "bar",
});

console.log(results);
console.log(filteredQueryResults);
