import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Berkshire Buds - Cannabis Price Transparency",
  description:
    "Compare cannabis prices across dispensaries in the Berkshires. Find the best deals on flower, edibles, concentrates, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-900 min-h-screen">
        <header className="bg-green-900 text-white shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-2xl font-bold tracking-tight">
              <span className="text-green-300">The Berkshire</span> Buds
            </a>
            <div className="flex gap-6 text-sm font-medium">
              <a href="/" className="hover:text-green-300 transition-colors">
                Home
              </a>
              <a
                href="/compare"
                className="hover:text-green-300 transition-colors"
              >
                Compare Prices
              </a>
              <a
                href="/dispensaries"
                className="hover:text-green-300 transition-colors"
              >
                Dispensaries
              </a>
              <a
                href="/about"
                className="hover:text-green-300 transition-colors"
              >
                About
              </a>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-green-900 text-green-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm">
            <p>&copy; 2026 The Berkshire Buds. All rights reserved.</p>
            <p className="mt-1 text-green-400">
              Cannabis price transparency for the Berkshires
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
