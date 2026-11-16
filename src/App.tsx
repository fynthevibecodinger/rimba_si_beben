import Gallery from "./pages/Gallery";
import { RouterProvider, useRouter } from "./router";
import { AmbientMusicProvider } from "./context/AmbientMusicContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer.tsx";
import Home from "./pages/Home";
import IssueDetail from "./pages/IssueDetail";
import EcosystemSimulation from "./pages/EcosystemSimulation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FallingLeaves from "./components/common/FallingLeaves";

function AppContent() {
  const { path } = useRouter();

  // Route matching
  const renderPage = () => {
    if (path === "/" || path === "") {
      return <Home />;
    }
    if (path.startsWith("/isu/")) {
      return <IssueDetail />;
    }
    if (path === "/simulasi") {
      return <EcosystemSimulation />;
    }
    if (path === "/about") {
      return <About />;
    }
    if (path === "/contact") {
      return <Contact />;
    }
    if (path === "/galeri") {
  return <Gallery />;
}
    // Default fallback to Home
    return <Home />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f5ee] text-[#173a2d] font-['Plus_Jakarta_Sans',sans-serif]">
      <FallingLeaves />
      <Navbar />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AmbientMusicProvider>
        <AppContent />
      </AmbientMusicProvider>
    </RouterProvider>
  );
}
