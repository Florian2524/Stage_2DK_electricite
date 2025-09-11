import React from "react";
import { createRoot } from "react-dom/client";
// import "./bootstrap"; // ❌ On enlève car le fichier n'existe pas
import "../css/app.css";

function App() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Starter React + Laravel</h1>
      <p>Base propre initialisée. On peut attaquer le header quand tu veux.</p>
    </main>
  );
}

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
}
