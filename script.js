document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.getElementById("timeline");
  const modal = document.getElementById("modal");

  // Fetch events from JSON
  fetch("events.json")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load events");
      return response.json();
    })
    .then(events => {
      events.forEach(event => {
        const article = document.createElement("article");
        article.innerHTML = `
          <h2>${event.year} – ${event.title}</h2>
          <p>
            <img src="${event.imageURL}" alt="${event.title}" style="float:left; height:300px; margin-right:10px;">
            ${event.description}
          </p>
        `;

        // Clicking opens modal
        article.addEventListener("click", () => openModal(event));

        timeline.appendChild(article);
      });
    })
    .catch(err => console.error(err));

  // Open modal with details
  function openModal(event) {
    modal.innerHTML = `
      <div style="background:white; padding:20px; border-radius:10px; max-width:600px; position:relative;">
        <button id="close-modal" style="position:absolute; top:10px; right:10px; background:red; color:white; border:none; padding:5px 10px; cursor:pointer;">X</button>
        <h2>${event.year} – ${event.title}</h2>
        <img src="${event.imageURL}" alt="${event.title}" style="max-width:100%; border-radius:5px; margin:10px 0;">
        <p>${event.description}</p>
        <p><strong>Category:</strong> ${event.category}</p>
      </div>
    `;
    modal.classList.add("active");

    document.getElementById("close-modal").addEventListener("click", closeModal);
  }

  // Close modal
  function closeModal() {
    modal.classList.remove("active");
    modal.innerHTML = "";
  }

  // Close modal if clicking outside content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Dark mode toggle
  document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
});
