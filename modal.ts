// src/modal.ts
import type { TimelineEvent } from "./types.js";

export function ensureModalContent(modalEl: HTMLElement): HTMLElement {
  let content = modalEl.querySelector(".modal-content") as HTMLElement | null;
  if (!content) {
    content = document.createElement("div");
    content.className = "modal-content";
    modalEl.appendChild(content);
  }
  return content;
}

export function openModal(modalEl: HTMLElement, event: TimelineEvent): void {
  const content = ensureModalContent(modalEl);
  content.innerHTML = `
    <button class="close-btn" aria-label="Close">&times;</button>
    <h2>${event.year} - ${event.title}</h2>
    <img src="${event.imageURL}" alt="${event.title}" style="max-width:100%;border-radius:6px;margin:0.5rem 0;">
    <p>${event.description}</p>
    <small>Category: ${event.category}</small>
  `;

  // Close button
  const closeBtn = content.querySelector(".close-btn") as HTMLButtonElement | null;
  if (closeBtn) closeBtn.addEventListener("click", () => closeModal(modalEl), { once: true });

  // Clicking the dark overlay closes modal
  const overlayHandler = (e: MouseEvent) => {
    if (e.target === modalEl) {
      closeModal(modalEl);
      modalEl.removeEventListener("click", overlayHandler);
    }
  };
  modalEl.addEventListener("click", overlayHandler);

  modalEl.classList.add("active");
}

export function closeModal(modalEl: HTMLElement): void {
  modalEl.classList.remove("active");
}
