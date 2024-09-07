import { useRef } from "react";
import style from "./App.module.scss";
import Gallery from "./components/Gallery/Gallery";
import Header from "./components/Header/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <Router>
      <section className={style.app} ref={scrollRef}>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/cats" />} />
          <Route path="/cats" element={<Gallery scrollRef={scrollRef} />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </section>
    </Router>
  );
}

export default App;

/**
 * Галерею
 * ЛК : вход выход
 * Проверка токена на бэке
 * Дефолтные страница с авторизацией
 */
