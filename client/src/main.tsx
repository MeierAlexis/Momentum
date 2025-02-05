import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { GoalHabitProvider } from "./context/GoalHabitContext.tsx";
import { PaymentProvider } from "./context/PaymentContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <PaymentProvider>
      <GoalHabitProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </GoalHabitProvider>
    </PaymentProvider>
  </AuthProvider>
);
