console.log('APP.JSX LOADED');

import React from "react";
import { createRoot } from "react-dom/client";
import "../css/app.css"; // Tailwind
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] text-gray-900 dark:text-gray-100 bg-white dark:bg-black">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl font-semibold">
            Starter React + Laravel — Base propre initialisée.
          </h1>
          <p className="mt-2 text-sm opacity-80">
            On peut attaquer le header (v1) et continuer l’intégration.
          </p>
        </section>
      </main>
      <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} 2DK Électricité
      </footer>
    </>
  );
}

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}