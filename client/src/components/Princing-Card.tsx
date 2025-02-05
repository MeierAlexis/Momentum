import "../styles/Pricing-Card.css";
import Button from "../components/Button";

interface PricingCardProps {
  title: string;
  text: string;
  price: string;
  features: string[];
  width?: string;
  height?: string;
  color1?: string | "#111";
  color2?: string | "#292929";
  ColorBackground1?: string;
  ColorBackground2?: string | undefined;
  BorderColor?: string;
  isPopular?: boolean;
  boxShadow?: string;
  onClick?: () => void;
}

function PricingCard(props: PricingCardProps) {
  // Logic for background gradient
  const backgroundStyle = props.ColorBackground2
    ? `linear-gradient(145deg, ${props.ColorBackground1}, ${props.ColorBackground2})`
    : props.ColorBackground1; // Directly assign the background value

  return (
    <div
      className="pricing-card"
      style={{
        width: props.width,
        height: props.height,
        background: backgroundStyle,
        border: `2px solid ${props.BorderColor}`,
        boxShadow: props.boxShadow,
      }}
    >
      <div className="pricing-card-container-titles">
        <h6 className="title">{props.title}</h6>
        <p className="text">{props.text}</p>
      </div>
      <div className="pricing-card-container-pricing">
        <h4 className="pricing">
          <span style={{ fontWeight: "bold" }}>{props.price}</span>/mo
        </h4>
        {props.isPopular && <div className="popular">Best Choice</div>}
        <Button
          text="Get Started"
          color1={props.color1}
          color2={props.color2}
          onClick={props.onClick}
        />
      </div>
      <div className="pricing-card-container-features">
        {props.features.map((feature, index) => (
          <div className="feature" key={index}>
            <span>✓</span>
            <p>{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingCard;
