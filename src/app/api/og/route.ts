import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const urlSchema = z.string().url().max(2048);

async function fetchOGData(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const getMetaContent = (property: string) => {
      const match = html.match(
        new RegExp(
          `<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']*)["']`,
          "i"
        )
      );
      return match ? match[1] : "";
    };

    return {
      title: getMetaContent("og:title"),
      description: getMetaContent("og:description"),
      image: getMetaContent("og:image"),
      url: getMetaContent("og:url"),
      type: getMetaContent("og:type"),
      "twitter:card": getMetaContent("twitter:card"),
      "twitter:image": getMetaContent("twitter:image"),
      "twitter:title": getMetaContent("twitter:title"),
      "twitter:description": getMetaContent("twitter:description"),
    };
  } catch (error) {
    console.error("Error fetching OG data:", error);
    throw error;
  }
}

app.get("/og", async (c) => {
  try {
    const url = c.req.query("url");

    if (!url) {
      return c.json({ error: "URL parameter is required" }, 400);
    }

    const validationResult = urlSchema.safeParse(url);
    if (!validationResult.success) {
      return c.json({ error: "Invalid URL format" }, 400);
    }

    const ogData = await fetchOGData(url);
    return c.json(ogData);
  } catch (error) {
    console.error("Error fetching open graph metadata:", error);
    return c.json({ error: "Failed to retrieve open graph metadata" }, 500);
  }
});

export const GET = handle(app);
