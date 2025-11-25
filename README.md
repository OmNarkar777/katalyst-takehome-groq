# Katalyst — Founding Engineer Take-Home (Groq Edition)

This repo uses Groq LLM for free, testable meeting summarization. All core requirements and bonuses implemented (mock adapter + Groq integration).

Run locally:
1. npm install
2. create .env.local with MCP_ADAPTER=mock and optional GROQ_API_KEY/GROQ_API_URL
3. npm run dev

Set GROQ_API_KEY to enable real summaries. Otherwise mock summaries are returned.
