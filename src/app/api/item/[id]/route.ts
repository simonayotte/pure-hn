import { Hono } from "hono";
import { handle } from "hono/vercel";

const BASE_URL = "https://hacker-news.firebaseio.com";
const ITEM_URL = "/v0/item/";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/item/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const response = await fetch(`${BASE_URL}${ITEM_URL}${id}.json`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const item = await response.json();
    return c.json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    return c.json({ error: "Failed to fetch item" }, 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
