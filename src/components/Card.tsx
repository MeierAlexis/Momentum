import "../styles/Card.css";

interface CardProps {
  title: string;
  text: string;
  src: string;
  rotation?: number;
  transformY?: number;
  transformX?: number;
  color1?: string;
  color2?: string;
}

function Card(props: CardProps) {
  return (
    <div
      className="card"
      style={{
        transform: `rotate(${props.rotation}deg) translateY(${props.transformY}px) translateX(${props.transformX}px)`,
        background: `linear-gradient(145deg, ${props.color1}, ${props.color2})`,
      }}
    >
      <img src={props.src} alt={props.title} className="card-image" />
      <h2 className="card-title">{props.title}</h2>
      <p className="card-text">{props.text}</p>
    </div>
  );
}

export default Card;
