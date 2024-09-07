import { useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import style from "./App.module.scss";
import Gallery from "./components/Gallery/Gallery";
import Header from "./components/Header/Header";
import AuthWindow from "./components/AuthWindow/AuthWindow";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { displayLogin } = useAuth();

  return (
    <BrowserRouter>
      <section className={style.app} ref={scrollRef}>
        <Header />
        {displayLogin && <AuthWindow />}

        <Routes>
          <Route path="/" element={<Navigate to="/cats" />} />
          <Route path="/cats" element={<Gallery scrollRef={scrollRef} />} />
          <Route path="/likes" element={<Gallery scrollRef={scrollRef} />} />
        </Routes>
      </section>
    </BrowserRouter>
  );
}

export default App;
