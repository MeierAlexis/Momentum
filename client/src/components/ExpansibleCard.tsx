import { useState } from "react";
import { MagicCard } from "react-magic-motion";
import "react-magic-motion/card.css";
import "../styles/ExpansibleCard.css";
import { ExtensibleCardProps } from "../interfaces/ExtensibleCardProps";

export function ExpansibleCard(
  props: ExtensibleCardProps & { onComplete: () => void }
) {
  const { title, description, startDate, endDate, state, onComplete } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <MagicCard
      isCardExpanded={isExpanded}
      onBackgroundFadeClick={() => setIsExpanded(false)}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
    >
      <div
        className={`${isExpanded ? "ExpandedCard" : "ClosedCard"}`}
        style={{ width: isExpanded ? "40rem" : "100%" }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3
          style={{
            fontWeight: 600,
            fontSize: isExpanded ? "3.5rem" : "1.5rem",
          }}
        >
          {title}
        </h3>
        {isExpanded && (
          <div style={{ marginTop: "1rem" }}>
            <p>
              <strong>Description:</strong> {description}
            </p>
            <p>
              <strong>Start Date:</strong> {startDate}
            </p>
            {endDate && (
              <p>
                <strong>End Date:</strong> {endDate}
              </p>
            )}

            {!state && (
              <button onClick={onComplete} className="CompleteButton">
                Goal achieved
              </button>
            )}
          </div>
        )}
      </div>
    </MagicCard>
  );
}
