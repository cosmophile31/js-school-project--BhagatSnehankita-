// src/renderer.ts
import type { TimelineEvent } from "./types.js";

export function renderTimeline(
  container: HTMLElement,
  events: TimelineEvent[],
  onClick: (ev: TimelineEvent) => void
): void {
  container.innerHTML = "";

  for (const ev of events) {
    const article = document.createElement("article");
    article.style.cursor = "pointer";
    article.setAttribute("tabindex", "0"); // keyboard focusable

    const img = document.createElement("img");
    img.src = ev.imageURL;
    img.alt = ev.title;

    const title = document.createElement("h2");
    title.textContent = `${ev.year} - ${ev.title}`;

    const desc = document.createElement("p");
    desc.textContent = ev.description;

    article.append(img, title, desc);

    // Click + Enter key to open modal
    article.addEventListener("click", () => onClick(ev));
    article.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") onClick(ev);
    });

    container.appendChild(article);
  }
}
