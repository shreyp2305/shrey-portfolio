# shrey-portfolio

Next.js personal portfolio site with a RAG-powered AI chatbot that answers visitor questions about the site owner's background, using content sourced from the site's own data file.

## 🏗️ Project Stack

- **Next.js 15** (App Router) — React framework, entry point `src/app/layout.tsx`
- **React 18** + **TypeScript 5** (`strict: true`)
- **Tailwind CSS 3** — CSS-variable-driven theme tokens, `darkMode: "class"`
- **next-themes** — dark/light theme switching (defaults to dark)
- **framer-motion** — page/section animations
- **LangChain** (`@langchain/core`, `@langchain/openai`, `@langchain/community`) — RAG orchestration
- **OpenAI** (`gpt-5`, `text-embedding-3-small`) — chat completion + embeddings
- **AstraDB** (`@datastax/astra-db-ts`) — vector store for chatbot retrieval
- **Upstash Redis** — optional LLM response cache (currently disabled in code)
- **Vercel AI SDK** (`ai`) — client-side chat hook (`useChat`) + streaming response on the server
- **No test runner configured** — `scripts/test.js` is a manual AstraDB scratch script, not an automated suite

## 🏛️ Architectural Patterns

### RAG chatbot flow

```
portfolioConfig.ts → generate.ts (embed + upsert) → AstraDB vector store
                                                            ↓
User message → /api/chat → history-aware retriever → context-grounded GPT answer → streamed to AIChatBox
```

- `src/data/portfolioConfig.ts` is the **single source of truth**: it exports `CONTACT`, `PROJECTS`, `EXPERIENCES`, which both render the Projects/Experience/Contact sections of the single-page site *and* seed the chatbot's knowledge.
- `scripts/generate.ts` (`npm run generate`) reads that config, builds one document per entry, splits it, embeds it with OpenAI, and upserts into AstraDB — wiping the collection first. Must be re-run manually whenever `portfolioConfig.ts` changes; nothing does this automatically.
- `src/app/api/chat/route.ts` rephrases the user's question using chat history (history-aware retriever), retrieves matching docs from AstraDB (`src/lib/astradb.ts`), and streams a GPT-5 answer grounded in that context back to the client.
- `src/components/AIChatButton.tsx` / `AIChatBox.tsx` drive the chat UI via `ai/react`'s `useChat`.

### Theming

- Tailwind tokens (`border`, `background`, `primary`, etc.) are CSS variables defined in `globals.css` and mapped in `tailwind.config.ts`.
- `ThemeProvider` wraps the app in `layout.tsx` (`next-themes`, class strategy, `defaultTheme="dark"`); `ThemeToggle` flips it client-side.

## 📁 Project Structure

```
shrey-portfolio/
  📱 src/app/                # Next.js App Router — single-page site + API routes
    layout.tsx                # Root layout: fonts, ThemeProvider, Navbar, Analytics
    page.tsx                  # Single-page site: Home/Projects/Experience/Contact sections (#home, #projects, #experience, #contact)
    api/chat/route.ts         # RAG chat endpoint (POST, streaming)
    globals.css                # Tailwind base + theme CSS variables, smooth in-page anchor scrolling
  🧩 src/components/          # UI components
    Navbar.tsx / Footer.tsx    # Layout chrome
    ThemeProvider.tsx / ThemeToggle.tsx
    AIChatButton.tsx / AIChatBox.tsx  # Chatbot UI (opens AIChatBox, uses useChat)
    ui/                        # H1 / H2 / H3 heading primitives
  📄 src/data/
    portfolioConfig.ts         # CONTACT / PROJECTS / EXPERIENCES — source of truth for pages + chatbot
  🛠️ src/lib/
    astradb.ts                 # AstraDB vector store + collection accessors
    utils.ts                   # cn() — clsx + tailwind-merge helper
  🖼️ src/assets/              # Project screenshots, profile photo
  🔧 scripts/
    generate.ts                 # Regenerates chatbot embeddings from portfolioConfig.ts
    test.js                     # Manual AstraDB scratch script (not part of CI/build)
  🌐 public/                   # Static files (resume.pdf, robots.txt, svgs)
  🔧 Config: next.config.ts, tailwind.config.ts, tsconfig.json, eslint.config.mjs, prettier.config.js
```

**Project Statistics:**

- 📦 **Directories**: 15
- 📄 **Files**: 50
- 🧪 **TypeScript/JS files**: 25
- 🧩 **Components**: 9
- 🧪 **Test files**: 0 (no automated test suite)

## 🛠️ Development Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | `next lint` (ESLint) |
| `npm run generate` | Rebuild chatbot embeddings from `portfolioConfig.ts` into AstraDB |

**Required env vars** (`.env.local`, not committed): `OPENAI_API_KEY`, `ASTRA_DB_ENDPOINT`, `ASTRA_DB_APPLICATION_TOKEN`, `ASTRA_DB_COLLECTION`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`. `src/lib/astradb.ts` throws at import time if the Astra vars are missing.

## 🌟 Key Project Features

### AI chatbot grounded in site content

- No separate CMS/scraping step — the chatbot's knowledge and the visible page content come from the exact same `portfolioConfig.ts` export.
- History-aware retrieval means follow-up questions are rephrased with prior chat context before hitting the vector store.
- Redis caching (`UpstashRedisCache`) is wired into `route.ts` but currently commented out on both the chat and rephrasing models.

### Config-driven content sections

- The Projects, Experience, and Contact sections (`#projects`, `#experience`, `#contact` on the single home page) have no hardcoded markup for their list content — they map directly over `portfolioConfig.ts` exports, so adding a project/role/contact method is a data-only change (plus re-running `npm run generate` for the chatbot to know about it).
- The Navbar links and the chatbot's cited links (`generate.ts` metadata `url` fields) point at in-page anchors (`/#projects`, `/#experience`, `/#contact`) rather than separate routes.
