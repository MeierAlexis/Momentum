import Header from "./components/Header.tsx";
import "./App.css";
import Home from "./components/Home.tsx";
import SectionFeatures from "./components/Section-Features";
import SectionCases from "./components/Section-Cases";
import SectionPricing from "./components/Section-Pricing";
import SectionQA from "./components/Section-QA";

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <SectionFeatures />
      <SectionCases />
      <SectionPricing />
      <SectionQA />
    </div>
  );
}

export default App;
