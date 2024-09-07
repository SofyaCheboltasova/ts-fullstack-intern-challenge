import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import style from "./App.module.scss";
import Gallery from "./components/Gallery/Gallery";
import Header from "./components/Header/Header";
import AuthWindow from "./components/AuthWindow/AuthWindow";

function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [displayLogin, setDisplayLogin] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("auth_token")
  );

  useEffect(() => {
    if (token) {
      setIsAuthorized(true);
      localStorage.setItem("auth_token", token);
    } else {
      setIsAuthorized(false);
      localStorage.removeItem("auth_token");
    }
  }, [token]);

  return (
    <BrowserRouter>
      <section className={style.app} ref={scrollRef}>
        <Header
          isAuthorized={isAuthorized}
          onLogout={() => setToken(null)}
          onLogin={() => setDisplayLogin(true)}
        />

        {displayLogin && (
          <AuthWindow
            onLogin={(token) => setToken(token)}
            onClose={() => setDisplayLogin(false)}
          />
        )}

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

/**
 * ЛК : вход выход
 * Проверка токена на бэке
 * Дефолтные страница с авторизацией
 */
