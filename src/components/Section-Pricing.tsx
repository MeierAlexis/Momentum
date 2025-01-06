import "../styles/Section-Pricing.css";
import PricingCard from "../components/Princing-Card";

function SectionPricing() {
  return (
    <div className="section-pricing" id="Pricing">
      <h1 className="title">Simple Pricing Plans</h1>
      <div className="cards-container">
        |
        <PricingCard
          title="Free"
          text=" Get started with Momentum and explore the core features to see how it fits your goals."
          price="$0"
          features={[
            "Limited Access",
            "Up to 3 active goals",
            "No Priority Support",
            "Weekly Habit Tracking",
          ]}
          color1="#FF5733"
          color2="#FF1044"
        />
        |
        <PricingCard
          title="Basic Plan"
          text="Unlock additional tools and enjoy more features for a smooth goal-setting experience."
          price="$30"
          features={[
            "Full Access to Basic Features",
            "Up to 5 Active Goals",
            "Integration with Populars Apps (e.g., Google Calendar)",
            "Daily Habit Tracking",
            "Standard Support",
          ]}
          width="500px"
          height="800px"
          ColorBackground2="#FF5733"
          ColorBackground1="#222"
          BorderColor="#444444"
          color1="#FF5733"
          color2="#FF1044"
          isPopular
          boxShadow="0 0 10px #FF5733, 0 0 15px #FF5733, 0 0 30px #FF5733"
        />
        |
        <PricingCard
          title="Premium Plan"
          text="Maximize your potential with exclusive features and priority support "
          price="$70"
          features={[
            "Full Access to all features",
            "Unlimited Active Goals",
            "Priority Support",
            "Advanced Tools (e.g. progress analysis and detail month report)",
            "Exclusive Support with Weekly Call with a Mentor",
          ]}
          color1="#FF5733"
          color2="#FF1044"
        />
      </div>
    </div>
  );
}

export default SectionPricing;
