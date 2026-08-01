import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import FloatingHearts from "./components/FloatingHearts.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import Home from "./pages/Home.jsx";
import Sorry from "./pages/Sorry.jsx";
import Reasons from "./pages/Reasons.jsx";
import SayNo from "./pages/SayNo.jsx";
import SayYes from "./pages/SayYes.jsx";
import Chat from "./pages/Chat.jsx";

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen">
      <FloatingHearts />
      <Navbar />
      <MusicPlayer />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/sorry" element={<PageWrapper><Sorry /></PageWrapper>} />
            <Route path="/reasons" element={<PageWrapper><Reasons /></PageWrapper>} />
            <Route path="/if-no" element={<PageWrapper><SayNo /></PageWrapper>} />
            <Route path="/if-yes" element={<PageWrapper><SayYes /></PageWrapper>} />
            <Route path="/chat" element={<PageWrapper><Chat /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}
