import Accordion from "./Accordion";
import "../styles/Section-QA.css";
function SectionQA() {
  return (
    <div className="section-qa">
      <h2 className="title">Frequently Asked Questions</h2>
      <div className="section-qa-questions">
        <Accordion
          title="What is Momentum?"
          content="Momentum is a platform designed to help you clarify your goals, create habits, and track your progress. You set detailed goals, build habits to achieve them, and monitor your achievements over time to stay focused and motivated. It's a powerful tool for personal and professional growth. Whether you're looking to improve your productivity, establish healthy habits, or achieve personal and professional goals, Momentum is the solution you need."
          borderTopLeft="5px solid #222"
          borderTopRight="5px solid #222"
        />
        <Accordion
          title="Who can benefit from using Momentum?"
          content="Momentum is ideal for anyone looking to improve their productivity, establish healthy habits, or achieve personal and professional goals. Whether you're a student, professional, or simply someone who wants to take control of their life, Momentum has everything you need to achieve your goals."
          borderTopLeft="5px solid #222"
          borderTopRight="5px solid #222"
        />
        <Accordion
          title="Can I customize my goals and habits?"
          content="Yes, Momentum allows you to fully customize your goals and habits to fit your specific needs, timelines, and preferences. You can define your goals in detail, including specific actions and habits needed to achieve them, and track your progress over time to stay focused and motivated."
          borderTopLeft="5px solid #222"
          borderTopRight="5px solid #222"
        />
        <Accordion
          title="Is Momentum free to use?"
          content="Momentum offers a free version with core features, as well as premium plans that include additional tools and insights to enhance your goal-setting and habit-tracking experience. Whether you're a beginner or an experienced user, Momentum has something for everyone."
          borderTopLeft="5px solid #222"
          borderTopRight="5px solid #222"
        />
        <Accordion
          title="How does Momentum track my progress?"
          content="Momentum uses an intuitive tracking system that logs your daily habits and progress toward your goals, providing insights and visual feedback to keep you motivated. It's a great tool for anyone looking to improve their productivity, establish healthy habits, or achieve personal and professional goals."
          borderTopLeft="5px solid #222"
          borderTopRight="5px solid #222"
        />
      </div>
    </div>
  );
}

export default SectionQA;
