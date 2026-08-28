# Job Application Assistant — Architecture

The core insight driving this design: **the hard problem is going from "form on a page I've never seen" → "structured data I already have," not the filling itself.** Filling a field once you know what it means is trivial. Understanding what a field means, on a portal you've never encountered, is the actual engineering problem. Everything below is organized around that.

## System overview — how the pieces talk to each other

```
┌─────────────────────────────────────────────────────────────────┐
│  BROWSER (Chrome Extension, Manifest V3)                        │
│                                                                   │
│  ┌───────────────┐      ┌──────────────────┐                    │
│  │ Content Script │ scan │  Field Manifest   │                   │
│  │ (runs on the   │─────▶│  {label, type,    │                  │
│  │  ATS page DOM) │      │   options, dom_id}│                  │
│  └───────────────┘      └─────────┬─────────┘                   │
│                                    │ POST /map-fields             │
│  ┌───────────────┐      ┌─────────▼─────────┐                   │
│  │  Review UI     │◀─────│ Background Worker │                   │
│  │  (React sidebar,      │ (orchestrates the  │                  │
│  │  shows fill +          │  request, gets     │                 │
│  │  confidence,           │  answers back)     │                 │
│  │  human approves)       └────────┬───────────┘                │
│  └───────────────┘                 │                              │
└─────────────────────────────────────┼──────────────────────────────┘
                                       │ HTTPS
┌──────────────────────────────────────▼──────────────────────────┐
│  BACKEND (Node/Express or Next.js API routes)                    │
│                                                                    │
│   ┌──────────────┐   miss   ┌───────────────────┐                │
│   │ Redis Cache   │─────────▶│ Field Mapper       │               │
│   │ key: domain + │          │  Stage 1: fuzzy    │               │
│   │ field-signature│         │   match vs known    │              │
│   │ (hit = skip    │         │   field taxonomy    │              │
│   │  LLM entirely) │◀────────│  Stage 2: LLM       │              │
│   └──────────────┘   store   │   structured extract│              │
│                                │   (only for misses) │              │
│                                └─────────┬───────────┘             │
│                                          │ reads                    │
│                                ┌─────────▼───────────┐             │
│                                │ Profile Store         │            │
│                                │ (Postgres): work       │           │
│                                │ history, education,    │          │
│                                │ EEO answers, JD-aware   │          │
│                                │ drafted answers         │          │
│                                └─────────────────────────┘         │
└────────────────────────────────────────────────────────────────┘
```

## Component-by-component, with the "why this tech"

**1. Content script (TypeScript, runs in-page)**
Walks the DOM, finds every `input`/`select`/`textarea`/ARIA-role form widget (Workday and similar SPAs love custom React comboboxes that aren't real `<select>` tags, so this has to handle synthetic widgets, not just native form elements). For each, it pulls together every signal about what the field _means_: associated `<label>`, `aria-label`, placeholder, nearby text nodes, and for selects/radios, the full option list. Output is a plain JSON "Field Manifest" — this is the interface boundary between "messy DOM" and "clean data," which is a good design instinct in general (isolate the ugly part early).

**2. Field Mapper — the actual hard part, two-staged for cost and speed**

- _Stage 1, heuristic:_ fuzzy-match each field's label text against a taxonomy you maintain of ~40-60 common fields (first name, phone, LinkedIn, work authorization, desired salary, etc.) using something like Fuse.js embeddings or simple string similarity. This resolves the boring 80% of fields — "Email Address" → email — instantly, with zero LLM cost.
- _Stage 2, LLM:_ only the fields heuristics can't confidently resolve get sent to an LLM with structured output (JSON schema / function calling), along with the relevant slice of your profile. The model returns either a matched profile field + confidence, or, for genuinely open-ended fields ("Why do you want to work here?"), a drafted answer grounded in your profile _and_ the job description scraped from the same page. This is real structured extraction, not "paste resume into ChatGPT" — directly extends the LangChain work you already have on your resume, but applied to a harder, higher-stakes extraction target.

**3. Redis cache, keyed by `domain + normalized-field-signature`**
This is the piece that makes the economics work and is a legitimate engineering decision worth explaining in an interview: hundreds of companies run the _same_ Workday tenant boilerplate, so once you've mapped "Workday's `legalFirstName` field" once, every future Workday application hits cache instead of the LLM — cutting cost and latency for the majority of real-world traffic. This is literally the same pattern as the Redis caching layer already on your resume, reused for a new purpose.

**4. Review UI (React sidebar injected into the page)**
Shows each field with what it's about to fill and a confidence score before anything touches the actual form — you approve or correct, then it fills. This is a deliberate design choice, not just a nice-to-have: it keeps a human in the loop before anything gets submitted to a real employer, which matters both for accuracy (LLMs will occasionally be wrong) and for staying squarely in "assistive tool" territory rather than "autonomous application bot," which is the right ethical and practical line for something interacting with third-party sites you don't control.

**5. Profile Store (Postgres)**
Your resume, but structured: not a PDF, but versioned JSON — work history, education, skills, standard EEO answers, links. This is also where job-description-aware answer drafting lives (tailoring a "why this role" answer using the JD text pulled from the page). Postgres because it's relational data you'll want to query and version, and it's already in your toolkit from Jobhub.

**6. Application Tracker (secondary, intentionally simple)**
Once something's submitted, log company/role/date/status. This part is legitimately just CRUD — and that's fine, because it's not the piece doing the work of proving what you can build. Don't over-invest here.

## Stack summary

| Layer     | Tech                                                                                        | Why                                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Extension | TypeScript, Manifest V3, React (sidebar UI)                                                 | You already know React; MV3 is the only path for a shippable Chrome extension today                                                          |
| Backend   | Node/Express or Next.js API routes                                                          | Same language as the extension, less context-switching, reuses your portfolio stack                                                          |
| LLM layer | Structured outputs (function calling / JSON schema) via your existing LangChain familiarity | Reliability matters more here than chain complexity — plain structured output is often more predictable than a full LangChain graph for this |
| Cache     | Redis                                                                                       | Direct reuse of your Ventera/portfolio caching experience, and it's the piece that makes cost/latency defensible                             |
| DB        | PostgreSQL                                                                                  | Relational profile + tracker data, matches your SQL background                                                                               |

## MVP vs. stretch

**MVP (prove the core idea on yourself, 3–5 real ATS platforms — Workday, Greenhouse, Lever):** content script + two-stage mapper + review UI + single-user profile as local JSON, no multi-user auth needed yet. Ship this, use it on real applications, and you already have a demo and a metric ("mapped N fields across M portals with X% requiring no correction").

**Stretch:** multi-page Workday wizard state persistence, resume/cover-letter file-upload handling with per-JD tailoring, the tracker dashboard, and a running accuracy/cost dashboard (this is your "prove it with data" artifact for the README — e.g. "cache hit rate went from 0% to 70% after the first 20 applications, cutting average LLM cost per application by X").

**One explicit non-goal, worth stating on purpose:** it should never store other sites' login credentials or attempt to defeat CAPTCHAs/auto-submit without your review — let the browser's own password manager handle logins, and keep a human in the loop on submit. That's not just an ethics footnote, it's a legitimate scope boundary that keeps the project sane to build and squarely in "assistant," not "bot."

claude --resume e352610b-4d73-4368-8722-58b24d70ecfd
