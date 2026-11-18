# Mansi Kumari | Portfolio

A responsive personal portfolio built with plain HTML, CSS and JavaScript.

**Live site:** https://mansikumari0406-alt.github.io/myportfolio/

## Features

- Responsive layout (mobile-first) with a hamburger menu on phones
- Project cards generated from a JavaScript array, with filter buttons
- **GitHub repos section:** fetches my public repositories from the GitHub API with `fetch` and `async/await`, shows a Loading message, and shows a friendly error message if the request fails
- Each repo card shows the name, description, language, star count and a link, with a Fork or Original tag
- **Light and dark mode:** a toggle switches a `dark` class on `body` to swap CSS variables, and the choice is saved in `localStorage`
- Semantic HTML, CSS variables, Flexbox and Grid

## Built with

HTML, CSS, JavaScript (no frameworks), GitHub API, Git, GitHub and GitHub Pages

## Project structure

```
myportfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── images/
    └── profile.jpg
```

## Run it locally

1. Clone or download this repository
2. Open `index.html` in your browser

## What I learned

- Fetching data from a public API with `fetch` and `async/await`
- Handling loading and error states with `try/catch` and `response.ok`
- Saving and reading settings with `localStorage`
- Theming a site by swapping CSS variables with a class on `body`

## Contact

- LinkedIn: https://www.linkedin.com/in/mansi-kumari-214a17370
- GitHub: https://github.com/mansikumari0406-alt