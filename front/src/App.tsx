import { useEffect, useRef, useState } from "react";
import style from "./App.module.scss";
import Gallery from "./components/Gallery/Gallery";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthWindow from "./components/AuthWindow/AuthWindow";
import { createUser } from "./api/api";

function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [, setToken] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [displayLogin, setDisplayLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setToken(token);
      setIsAuthorized(true);
    }
  }, []);

  async function onLogin(login: string, password: string) {
    const token = await createUser(login, password);

    if (token) {
      setToken(token);
      setIsAuthorized(true);
      localStorage.setItem("auth_token", token);
    }
  }

  function onLoginClick() {
    setDisplayLogin(true);
  }

  function onLogoutClick() {
    setToken(null);
    setIsAuthorized(false);
    localStorage.removeItem("auth_token");
  }

  function onClose() {
    setDisplayLogin(false);
  }

  return (
    <BrowserRouter>
      <section className={style.app} ref={scrollRef}>
        <Header
          isAuthorized={isAuthorized}
          onLoginClick={onLoginClick}
          onLogoutClick={onLogoutClick}
        />

        {displayLogin && <AuthWindow onLogin={onLogin} onClose={onClose} />}

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
