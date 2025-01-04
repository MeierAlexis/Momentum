import Header from "./components/Header.tsx";
import "./App.css";
import Home from "./components/Home.tsx";
import SectionFeatures from "./components/Section-Features";
import SectionCases from "./components/Section-Cases";
import SectionPricing from "./components/Section-Pricing";

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <SectionFeatures />
      <SectionCases />
      <SectionPricing />
    </div>
  );
}

export default App;
