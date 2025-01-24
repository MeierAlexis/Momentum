import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { GoalHabitProvider } from "./context/GoalHabitContext.tsx";
createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <GoalHabitProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </GoalHabitProvider>
  </AuthProvider>
);
