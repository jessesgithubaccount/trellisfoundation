import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <main className="site-frame">
      <iframe
        title="Trellis Foundation website"
        src="/trellis-site.html"
        className="site-iframe"
      />
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
