console.log("script.js is running");
// ---------- Project data: to add a project, add one more object ----------

const projects = [
  {
    title: "PeoplePilot – User Management System",
    description: "A full-stack user management application featuring secure registration and login, role-based access, admin and user dashboards, and CRUD operations with MongoDB integration.",
    tags: ["JavaScript", "React", "Node.js", "Express.js", "MongoDB"],
    link: "https://github.com/mansikumari0406-alt/PeoplePilot-User-Management-System",
    linkText: "View on GitHub ↗",
    status: "Completed"
  },
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

// ========== Week 3: GitHub repos + theme toggle ==========

// Turn text into safe text so descriptions from other people can't inject HTML
function escapeHTML(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const REPOS_URL = "https://api.github.com/users/mansikumari0406-alt/repos?per_page=100";
const reposGrid = document.querySelector("#repos-grid");
const reposStatus = document.querySelector("#repos-status");
const languageFilter = document.querySelector("#language-filter");
const repoControls = document.querySelector("#repo-controls");

let allRepos = [];
function createRepoCard(repo) {
  const kind = repo.fork ? "Fork" : "Original";
  const description = repo.description || "No description yet";
  const language = repo.language || "Not specified";
  return `
    <article class="card">
      <span class="tag">${kind}</span>
      <h3>${escapeHTML(repo.name)}</h3>
      <p>${escapeHTML(description)}</p>
      <p class="repo-meta">
        <span>● ${escapeHTML(language)}</span>
        <span>★ ${repo.stargazers_count}</span>
      </p>
      <a href="${escapeHTML(repo.html_url)}" target="_blank" rel="noopener">View repo ↗</a>
    </article>`;
}

function displayRepos(repos) {
  reposGrid.innerHTML = repos.length
    ? repos.map(createRepoCard).join("")
    : '<p class="status-message">No repositories found for this language.</p>';
}

function setupLanguageFilter(repos) {
  const languages = [
    ...new Set(repos.map(repo => repo.language).filter(Boolean))
  ].sort();

  languages.forEach(language => {
    const option = document.createElement("option");
    option.value = language;
    option.textContent = language;
    languageFilter.appendChild(option);
  });

  repoControls.hidden = false;

  languageFilter.addEventListener("change", () => {
    const selectedLanguage = languageFilter.value;

    const filteredRepos = selectedLanguage === "All"
      ? allRepos
      : allRepos.filter(repo => repo.language === selectedLanguage);

    displayRepos(filteredRepos);
  });
}

async function loadRepos() {
  try {
    const response = await fetch(REPOS_URL);

    if (!response.ok) {
      throw new Error("GitHub responded with status " + response.status);
    }

    allRepos = await response.json();

    // Own repos first, then most stars, then most recently updated
    allRepos.sort((a, b) =>
      (a.fork - b.fork) ||
      (b.stargazers_count - a.stargazers_count) ||
      (new Date(b.updated_at) - new Date(a.updated_at))
    );

    reposStatus.hidden = true;

    if (allRepos.length > 0) {
      setupLanguageFilter(allRepos);
      displayRepos(allRepos);
    } else {
      reposGrid.innerHTML =
        '<p class="status-message">No public repositories yet.</p>';
    }

  } catch (error) {
    reposStatus.hidden = false;
    reposStatus.classList.add("error");
    reposStatus.textContent =
      "Sorry, I couldn't load my GitHub repos right now. Please try again later or visit my GitHub profile.";

    console.error("Could not load repos:", error);
  }
}

loadRepos();

// ---------- Light / dark theme (remembered with localStorage) ----------
const themeToggle = document.querySelector("#theme-toggle");


function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";

  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
}

function getSavedTheme() {
  try {
    return localStorage.getItem("theme") || "dark";
  } catch (error) {
    return "dark";
  }
}

themeToggle.addEventListener("click", () => {
  const next = document.body.classList.contains("dark") ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("theme", next);
  } catch (error) {
    // storage blocked: the theme still changes, it just won't be remembered
  }
});

applyTheme(getSavedTheme());