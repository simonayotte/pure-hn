# Pure HN - A Minimal Hacker News Client

A clean and minimal web client for browsing Hacker News top stories and comments.

Built with Next.js 14, React, and TailwindCSS.

## Features

- 🚀 Browse top stories from Hacker News
- 💬 Read comments in a threaded view
- 🌓 Dark/Light mode support
- 🖼️ Story preview images (when available)
- ⚡ Fast and responsive UI
- 🔄 Real-time updates with React Query
- 🎯 Edge runtime for optimal performance

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [React Query](https://tanstack.com/query) - Data fetching and caching
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Hono](https://hono.dev/) - Edge API routes
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pure-hn.git
cd pure-hn
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/               # Next.js app router
│   ├── api/           # API routes using Hono
│   └── page.tsx       # Main page component
├── components/        # React components
│   ├── comment/       # Comment-related components
│   ├── story/         # Story-related components
│   └── ui/            # Shared UI components
├── lib/               # Utility functions and types
│   └── api/           # API client and types
```

## API Routes

The project uses the official Hacker News API through edge functions:

- `/api/topstories` - Get IDs of top stories
- `/api/item/[id]` - Get item details (story/comment)
- `/api/og` - Get Open Graph metadata for story URLs

## References

1. [Hacker News API](https://github.com/HackerNews/API)
