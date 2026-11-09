# Fieldnotes

A responsive journal-style blog built with React, Vite, and React Router. Fieldnotes pairs an editorial layout and landscape artwork with live demo posts from JSONPlaceholder.

## Features

- Blog index with dynamically fetched posts and individual stories at `/posts/:postId`.
- Author details, existing comments, and a comment form powered by JSONPlaceholder.
- Loading, error, and missing-post states.
- Contact page at `/contact` with required-field and email validation.
- Light and dark themes, with the selected theme saved in local storage.
- Responsive layout, keyboard-accessible controls, and status announcements.

## Install and run

Use Node.js 24 LTS and npm. Run these commands from this project folder:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. No API keys or environment variables are required. Keep `package-lock.json` in Git so `npm ci` installs the recorded dependency versions.

## Production build

```sh
npm run build
npm run preview
```

The build produces `dist/`. The preview command serves the production build locally. Check `/`, `/posts/1`, and `/contact`, including refreshing each route, and try the theme toggle and comment form.

The current build succeeds with React Router dependency warnings about `"use client"` directives; these do not fail the build.

## Demo behavior

Posts, authors, and comments are fetched from `https://jsonplaceholder.typicode.com`. Submitted comments go to that demo API and appear for the current visit; they are not persisted on its server. Likes are also held in memory. The Contact form validates input and displays a local confirmation; it does not send email or store messages. Do not enter sensitive information into demo forms.

Google Fonts supplies DM Sans and Playfair Display. Internet access is needed for remote fonts and API content.

## Prepare a public GitHub repository

Publish only this project folder. At preparation time, this folder inherited a Git repository rooted above the project in the user's home directory. Before staging files, initialize a separate repository **inside this project folder** and verify its root:

```sh
git init
git rev-parse --show-toplevel
git status --short
```

The printed root must be this project folder. Review the files before creating a commit or pushing. No repository initialization, commit, push, or deployment was performed during preparation.

The `.gitignore` excludes dependencies, build output, environment files, local credentials, deployment metadata, logs, and system/editor files. Project sources and the lockfile were reviewed with no credentials or personal contact information found. The unused sample stories in `src/data/posts.js` contain editorial author names; runtime author data comes from JSONPlaceholder. Review future changes before publishing. Never place secrets in client code or `VITE_*` variables because browser bundles are public.

## Vercel configuration

When you choose to deploy later, import the project repository into Vercel with these settings:

| Setting | Value |
| --- | --- |
| Root directory | Folder containing `package.json` and `vercel.json` |
| Framework preset | Vite |
| Node.js version | 24.x |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment variables | None required |

`vercel.json` includes the SPA rewrite recommended in [Vercel's Vite documentation](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas), allowing direct requests and refreshes at `/posts/1` and `/contact` to load `index.html` and let React Router render the page. Verify those URLs after an eventual deployment; hosted behavior has not been tested yet.
