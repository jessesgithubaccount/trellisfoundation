# Trellis Foundation — React + Vite

This project provides a React/Vite entry point for the supplied Trellis Foundation website and preserves the original page's styling and behavior.

## Requirements
- Node.js 20.19+ or 22.12+ recommended
- npm

## Run locally
```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build
```bash
npm run build
npm run preview
```

## Project structure
```text
trellis-foundation-react/
├── public/
│   └── trellis-site.html   # Original supplied website
├── src/
│   ├── main.jsx            # React application entry
│   └── styles.css
├── index.html
├── package.json
└── README.md
```

## Note
The supplied HTML already contains a bundled React application, but it does not include the original maintainable component source files. To preserve the supplied website faithfully, this starter renders that page inside a React-managed iframe. The next step for a fully componentized React codebase would be to recover/rebuild its individual page components from the bundled output.
