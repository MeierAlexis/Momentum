import Header from "../components/Header";
import SectionHome from "../components/Section-Home";
import SectionFeatures from "../components/Section-Features";
import SectionCases from "../components/Section-Cases";
import SectionPricing from "../components/Section-Pricing";
import SectionQA from "../components/Section-QA";
import SectionFooter from "../components/Section-Footer";

export default function Home() {
  return (
    <div className="App">
      <Header />
      <SectionHome />
      <SectionFeatures />
      <SectionCases />
      <SectionPricing />
      <SectionQA />
      <SectionFooter />
    </div>
  );
}
