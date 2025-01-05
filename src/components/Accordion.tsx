import { useState } from "react";
import { MagicMotion } from "react-magic-motion";

interface acordionProps {
  title: string;
  content: string;
  borderTopRight?: string;
  borderTopLeft?: string;
  borderBottomRight?: string;
  borderBottomLeft?: string;
}

export default function Accordion(props: acordionProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MagicMotion
      transition={{ type: "spring", stiffness: 180, damping: 20, mass: 1.1 }}
    >
      <div
        style={{
          backgroundColor: "#111",
          borderRadius: 12,
          marginBottom: "0",
          overflow: "hidden",
          color: "#fff",
          width: "100%",
          border: "1px solid #222",
          padding: "0.5rem",
        }}
      >
        <button
          style={{
            fontSize: "1.1em",
            fontWeight: 500,
            width: "100%",
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "transparent",
            cursor: "pointer",
            color: "#fff",
            border: "transparent",
            padding: "2rem",
            borderTopLeftRadius: props.borderTopLeft,
            borderTopRightRadius: props.borderTopRight,
            borderBottomLeftRadius: props.borderBottomLeft,
            borderBottomRightRadius: props.borderBottomRight,
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{props.title}</span>
          <svg
            key="exclude"
            style={{
              transform: `rotate(${isOpen ? 180 : 0}deg)`,
              transition: "320ms ease-in-out",
            }}
            width="20"
            height="20"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 10L15.6714 21L27.5 10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {isOpen && (
          <div
            style={{
              gap: "1rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p>{props.content}</p>
          </div>
        )}
      </div>
    </MagicMotion>
  );
}
