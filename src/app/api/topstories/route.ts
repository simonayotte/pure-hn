import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cache } from "hono/cache";

const BASE_URL = "https://hacker-news.firebaseio.com";
const TOP_STORIES_URL = "/v0/topstories.json";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get(
  "/topstories",
  cache({
    cacheName: "top-stories",
    cacheControl: `max-age=300`,
  }),
  async (c) => {
    try {
      const response = await fetch(BASE_URL + TOP_STORIES_URL, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const posts = await response.json();
      return c.json(posts);
    } catch (error) {
      console.error("Error fetching top stories:", error);
      return c.json({ error: "Failed to fetch stories" }, 500);
    }
  }
);

export const GET = handle(app);
export const POST = handle(app);
