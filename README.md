# Trellis Foundation – React version

The original plain HTML/CSS/JS site, converted to React (Vite + React Router).

## Run it

You need Node.js 20.19 or newer (check with `node -v`).

```bash
npm install      # download the tools (only the first time)
npm run dev      # start the site, then open the address it prints
npm run build    # make the final files in the "dist" folder
```

## What is where

```
index.html                 the one empty page React draws everything into
public/assets/             pictures (logo, hero, team photos, ...)
src/main.jsx               START HERE: boots React
src/App.jsx                which URL shows which page
src/styles.css             all the CSS
src/pages/                 Home  About  Sessions  SessionPost  ProgrammePage
src/components/            reusable pieces (Header, Footer, TeamCard, ContactForm, ...)
src/data/sessions.js       ALL session recaps live here (edit to add or change a recap)
src/data/programme.js      the three "Our Programme" pages
src/data/meeting.js        date shown in the "Next Meet" pop-up
src/data/site.js           CONTACT_EMAIL for the "Send Us A Message" form
```

## Contact form

The form opens the visitor's email app. Set `CONTACT_EMAIL` in `src/data/site.js`
to the address that should receive messages (until then it says sending is not set up).

## Hosting note

The site uses real URLs (`/about`, `/sessions`). On Netlify the included
`public/_redirects` file makes that work. Other hosts need a similar
"send every URL to index.html" rule.

