// ---------- Project data: to add a project, add one more object ----------
const projects = [
  {
    title: "Personal Portfolio Website",
    description: "A responsive personal website built with semantic HTML and CSS to introduce my background, skills, projects, and contact information.",
    tags: ["HTML", "CSS"],
    link: "https://github.com/mansikumari0406-alt/myportfolio",
    linkText: "View on GitHub ↗",
    status: "Completed"
  },
  {
    title: "Student Marks Calculator",
    description: "A Python program planned to take subject marks and calculate total marks, percentage, and grade.",
    tags: ["Python"],
    link: "#projects",
    linkText: "Coming soon",
    status: "Planned"
  },
  {
    title: "To-Do List App",
    description: "A JavaScript web app planned to let users add tasks, mark them complete, and remove them in the browser.",
    tags: ["JavaScript", "HTML"],
    link: "#projects",
    linkText: "Coming soon",
    status: "Planned"
  }
];

// ---------- Show projects on the page ----------
const projectGrid = document.querySelector("#projects-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

function createCard(project) {
  const tags = project.tags.map(tag => `<li>${tag}</li>`).join("");
  const external = project.link.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
  return `
    <article class="card">
      <span class="tag">${project.status}</span>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <ul class="chips">${tags}</ul>
      <a href="${project.link}"${external}>${project.linkText}</a>
    </article>`;
}

function renderProjects(filter = "All") {
  const visible = filter === "All"
    ? projects
    : projects.filter(project => project.tags.includes(filter));

  projectGrid.innerHTML = "";   // clear old cards first
  projectGrid.innerHTML = visible.length
    ? visible.map(createCard).join("")
    : '<p class="empty-message">No projects with this tag yet.</p>';
}

// ---------- Filter buttons ----------
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    renderProjects(button.dataset.filter);
  });
});

renderProjects();

// ---------- Mobile menu ----------
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "✕" : "☰";
}

menuToggle.addEventListener("click", () => {
  setMenu(!navLinks.classList.contains("open"));
});

// Close the menu when a link is tapped
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => setMenu(false));
});