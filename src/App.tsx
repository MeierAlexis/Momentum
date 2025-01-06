import Header from "./components/Header";
import "./App.css";
import Home from "./components/Home";
import SectionFeatures from "./components/Section-Features";
import SectionCases from "./components/Section-Cases";
import SectionPricing from "./components/Section-Pricing";
import SectionQA from "./components/Section-QA";
import SectionFooter from "./components/Section-Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <SectionFeatures />
        <SectionCases />
        <SectionPricing />
        <SectionQA />
        <SectionFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
