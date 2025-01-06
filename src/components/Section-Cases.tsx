import "../styles/Section-Cases.css";

function SectionCases() {
  return (
    <div className="section-cases" id="Cases">
      <h1 className="title">
        <span style={{ fontWeight: "bold" }}>What</span> People Say
      </h1>
      <p className="section-cases-words">
        "Whether it’s setting your first goal of the year or celebrating your
        final milestone, this app is here to guide you every step of the way
        toward achieving your dreams."
      </p>
      <p className="testimonial">
        "Thanks to Momentum, I actually stuck to my New Year’s resolutions and
        achieved them!"
      </p>
      <p className="name-testimonial">-John D, Momentum Client</p>
      <p className="testimonial">
        "I’ve tried many tools to stay on track with my goals, but nothing
        compares to this app. It breaks down big dreams into manageable habits
        and keeps me motivated every step of the way. Every dollar I’ve invested
        has been worth it—seeing my progress and actually achieving what I set
        out to do is priceless!"
      </p>
      <p className="name-testimonial">-Samantha L, Momentum Client</p>
    </div>
  );
}
export default SectionCases;
