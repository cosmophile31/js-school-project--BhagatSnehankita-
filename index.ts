// src/index.ts
import { fetchEvents } from "./fetcher.js";
import { renderTimeline } from "./renderer.js";
import { openModal } from "./modal.js";
import type { TimelineEvent } from "./types.js";

document.addEventListener("DOMContentLoaded", async () => {
  const timeline = document.getElementById("timeline");
  const modal = document.getElementById("modal");

  if (!timeline || !modal) {
    console.error("#timeline or #modal not found in index.html");
    return;
  }

  try {
    const events: TimelineEvent[] = await fetchEvents("data/events.json");
    renderTimeline(timeline, events, (ev) => openModal(modal, ev));
  } catch (err) {
    console.error(err);
    timeline.textContent = "Failed to load events. Please try again.";
  }
});
