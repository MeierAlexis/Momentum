import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/ExpansibleCard.css";
import { ExtensibleCardProps } from "../interfaces/ExtensibleCardProps";
import { HabitData } from "../interfaces/HabitData"; // Asegúrate de importar HabitData
import { useGoalHabit } from "../context/GoalHabitContext.tsx";
export function ExpansibleCard(
  props: ExtensibleCardProps & { onComplete: () => void } & {
    onDelete: () => void;
  }
) {
  const {
    id,
    title,
    description,
    start_date,
    end_date,
    target,
    state,
    onComplete,
    onDelete,
  } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [habits, setHabits] = useState<HabitData[]>([]);
  const { getHabits } = useGoalHabit();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    const getHabitsByGoalId = async () => {
      try {
        const HabitData = await getHabits(id);
        console.log(HabitData);
        setHabits(HabitData.habits);
      } catch (error) {
        console.error("Error al obtener las metas:", error);
      }
    };
    getHabitsByGoalId();
  }, []);

  return (
    <>
      {/* Fondo oscuro cuando la tarjeta está expandida */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
            onClick={() => setIsExpanded(false)} // Cierra la tarjeta al hacer clic fuera
          />
        )}
      </AnimatePresence>

      {/* Tarjeta animada */}
      <motion.div
        className={`ExpansibleCard ${
          isExpanded ? "ExpandedCard" : "ClosedCard"
        }`}
        style={{
          width: isExpanded ? "40rem" : "100%",

          color: state ? "#666" : "",
          position: isExpanded ? "fixed" : "relative", // Fija la tarjeta en el centro cuando está expandida
          top: isExpanded ? "22%" : "auto",
          left: isExpanded ? "35%" : "auto",

          transform: isExpanded ? "translate(-50%, -50%)" : "none",
          zIndex: isExpanded ? 1000 : 1, // Asegura que la tarjeta esté por encima del fondo oscuro
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        initial={false}
        animate={{
          scale: isExpanded ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        <h3
          style={{
            fontWeight: 600,
            fontSize: isExpanded ? "3.5rem" : "1.5rem",
            textDecoration: state ? "line-through red" : "none",
          }}
        >
          {title}
        </h3>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              style={{ marginTop: "1rem" }}
            >
              <p>
                <strong>Description:</strong> {description}
              </p>
              <p>
                <strong>Target:</strong> {target}
              </p>
              <p>
                <strong>Start Date:</strong> {formatDate(start_date)}
              </p>
              {end_date && (
                <p>
                  <strong>End Date:</strong> {formatDate(end_date)}
                </p>
              )}
              {habits && (
                <>
                  <p>
                    <strong>Habit List:</strong>
                  </p>
                  <ul className="HabitList">
                    {habits.map((habit) => (
                      <li key={habit.id} className="HabitItem">
                        {habit.title} - {habit.days}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="CardButtons">
                {!state && (
                  <button onClick={onComplete} className="CompleteButton">
                    Goal achieved
                  </button>
                )}
                <button className="DeleteButton" onClick={onDelete}>
                  Delete
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
