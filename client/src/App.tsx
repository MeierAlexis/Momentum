import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import { Dashboard } from "./pages/Dashboard.tsx";
import { Goals } from "./pages/Goals.tsx";
import { Help } from "./pages/Help.tsx";
import { Tracker } from "./pages/Tracker.tsx";
import { ProtectedRoute } from "../src/ProtectedRoute.tsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Logic of routing for the app */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<Home />} />
          <Route path="/tracker" element={<Tracker />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
