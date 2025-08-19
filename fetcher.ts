// src/fetcher.ts
import type { TimelineEvent } from "./types.js";

/** Fetch and parse events JSON with basic validation */
export async function fetchEvents(url: string): Promise<TimelineEvent[]> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load ${url}: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as unknown;

  // Minimal runtime validation (guards)
  if (!Array.isArray(data)) {
    throw new Error("events.json is not an array");
  }

  const cleaned: TimelineEvent[] = data.map((raw, i) => {
    const obj = raw as Record<string, unknown>;
    const year = String(obj.year ?? "");
    const title = String(obj.title ?? "");
    const description = String(obj.description ?? "");
    const imageURL = String(obj.imageURL ?? "");
    const category = String(obj.category ?? "") as TimelineEvent["category"];

    if (!year || !title || !description || !imageURL || !category) {
      throw new Error(`Invalid event at index ${i}`);
    }
    return { year, title, description, imageURL, category };
  });

  return cleaned;
}
