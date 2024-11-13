import { Item } from "./types";

/**
 * Fetches the IDs of the top 500 stories from Hacker News
 * @returns {Promise<number[]>} Array of story IDs
 */
async function getTopStories(): Promise<number[]> {
  const response = await fetch("/api/topstories");
  const stories: number[] = await response.json();
  return stories;
}

/**
 * Fetches a single item from Hacker News by its ID
 * @param {number} id - The ID of the item to fetch
 * @returns {Promise<Item>} The item data, which can be a Story, Comment, Job, Poll, or PollOption
 */
async function getItem(id: number): Promise<Item> {
  const response = await fetch(`/api/item/${id}`);
  const item = await response.json();
  return item;
}

export { getTopStories, getItem };
