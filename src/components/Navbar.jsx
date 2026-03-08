import { useState } from "react";

export default function Navbar({ currentPage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: "home", label: "Home" },
    { id: "compare", label: "Compare Prices" },
    { id: "dispensaries", label: "Dispensaries" },
    { id: "about", label: "About" },
  ];

  return (
    <header className="bg-green-900 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="text-2xl font-bold tracking-tight"
        >
          <span className="text-green-300">The Berkshire</span> Buds
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`hover:text-green-300 transition-colors ${
                currentPage === link.id ? "text-green-300" : ""
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "\u2715" : "\u2630"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-800 px-4 pb-4 space-y-2">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMenuOpen(false);
              }}
              className={`block w-full text-left py-2 px-2 rounded hover:bg-green-700 ${
                currentPage === link.id ? "text-green-300" : ""
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
