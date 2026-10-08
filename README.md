# Trellis Foundation – React version

The original plain HTML/CSS/JS site, converted to React (Vite + React Router).

## Run it

You need Node.js 20.19 or newer (check with `node -v`).

```bash
npm install      # download the tools (only the first time)
npm run dev      # start the site, then open the address it prints
npm run build    # make the final files in the "dist" folder
```

## What is where (the Lego box)

```
index.html                 the one empty page React draws everything into
public/assets/             pictures (logo, hero, ...)
src/main.jsx               START HERE: boots React
src/App.jsx                the "door signs": which URL shows which page
src/styles.css             the original CSS, unchanged
src/pages/                 one file per room
    Home.jsx   About.jsx   Sessions.jsx   SessionPost.jsx   SignIn.jsx
src/components/            reusable bricks
    Layout.jsx             frame around Home/About (top bar, header, footer)
    TopBar  Header  Footer  SocialIcons  MentorCard  TeamCard  SessionCard  VideoThumb  Img  BackToTop
    ChatWidget.jsx         shows the round Chat button OR the open panel
    ChatPanel.jsx          the chat itself (messages, emoji, images)
src/data/sessions.js         ALL session recaps live here (edit this to add or change a recap)
src/context/               shared "notice boards"
    AuthContext.jsx        who is signed in + sign in / sign up / reset
    ChatContext.jsx        is the chat open? + how to open it
src/lib/chatStore.js       all saving/loading (browser storage for now)
```

## Old code -> React

| Old (script.js)                          | React                                        |
| ---------------------------------------- | -------------------------------------------- |
| `location.hash` + hiding `<main>`s       | React Router in `App.jsx`                    |
| copy-pasted cards / social icons         | components + `.map()` (`MentorCard`, ...)    |
| `getElementById(...).hidden = true`      | `useState` (e.g. `isOpen`, `mode`)           |
| `setInterval`, `keydown` listeners       | `useEffect` (see `ChatPanel.jsx`)            |
| global `user` variable                   | `AuthContext`                                |

## Important: demo-only chat and sign-in

Accounts and messages are stored in each visitor's own browser, and the mentor
code is visible in the site's code. Two different people cannot see each
other's messages. Before a real launch, replace the `ChatStore` functions in
`src/lib/chatStore.js` with a real backend (e.g. Supabase or Firebase).

## Hosting note

The site uses real URLs (`/about`, `/signin`). On Netlify the included
`public/_redirects` file makes that work. Other hosts need a similar
"send every URL to index.html" rule.

## Missing pictures

`testimonial.webp`, `video-1.webp`, `about-1.webp` and `about-2.webp` were not in
the original zip. Grey placeholders show until you add files with those names
to `public/assets/`.
