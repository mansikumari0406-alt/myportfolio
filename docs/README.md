# Mansi Kumari | Portfolio

A responsive personal portfolio built with plain HTML, CSS and JavaScript.

**Live site:** https://mansikumari0406-alt.github.io/myportfolio/

## Features

- Responsive layout that works on phones and laptops, using a mobile-first approach with media queries
- Mobile hamburger menu that toggles an `open` class with JavaScript, and closes when a link is tapped
- Project cards generated from a JavaScript array, so adding a project only means editing data
- Filter buttons (All, HTML, JavaScript, Python) that show only the matching projects, with the active button highlighted
- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`), CSS variables, Flexbox and smooth scrolling

## Built with

HTML, CSS, JavaScript (no frameworks), Git, GitHub and GitHub Pages

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

## Add a new project

Open `script.js` and add one more object to the `projects` array:

```js
{
  title: "My New Project",
  description: "One line about what it does.",
  tags: ["JavaScript"],
  link: "https://github.com/mansikumari0406-alt/my-new-project",
  linkText: "View on GitHub ↗",
  status: "Completed"
}
```

The card and its filter appear automatically, with no HTML changes.

## What I learned

- Selecting elements and listening for events with `querySelector` and `addEventListener`
- Storing data in an array of objects and rendering it with `map()` and template literals
- Filtering data with `filter()` and toggling CSS classes from JavaScript
- Mobile-first responsive design and testing at 375px width

## Contact

- LinkedIn: https://www.linkedin.com/in/mansi-kumari-214a17370
- GitHub: https://github.com/mansikumari0406-alt