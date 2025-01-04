import "../styles/Section-Features.css";
import Card from "../components/Card";

function SectionFeatures() {
  return (
    <div className="section-features">
      <h1 className="title">
        <span style={{ fontWeight: "bold" }}>How it</span> Works
      </h1>
      <div className="card-container">
        <Card
          title="Set"
          text="Define your goal in detail, including the specific actions and habits needed to achieve it"
          src="/Set.svg"
          rotation={-10}
          transformY={-20}
          transformX={90}
          color1="#111"
          color2="#333"
        />
        <Card
          title="Progress"
          text="Track your journey and monitor your progress over time"
          src="/Progress.svg"
          rotation={0}
          transformY={0}
          transformX={0}
          color1="#222"
          color2="#333"
        />
        <Card
          title="Strategy"
          text="Develop a clear plan of action, including the right habits and strategies, to ensure consistent progress toward your goal"
          src="/Strategy.svg"
          rotation={15}
          transformY={120}
          transformX={-65}
          color1="#333"
          color2="#222"
        />
      </div>
    </div>
  );
}

export default SectionFeatures;
