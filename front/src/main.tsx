import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.module.scss";
import { AuthProvider } from "./contexts/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
