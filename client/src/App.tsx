import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import { Dashboard } from "./pages/Dashboard.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Logic of routing for the app */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
