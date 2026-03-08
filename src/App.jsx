import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import Dispensaries from "./pages/Dispensaries";
import About from "./pages/About";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "compare":
        return <Compare />;
      case "dispensaries":
        return <Dispensaries />;
      case "about":
        return <About />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
    </div>
  );
}
