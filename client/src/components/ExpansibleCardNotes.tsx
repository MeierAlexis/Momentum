import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/ExpansibleCardNotes.css";
import { useGoalHabit } from "../context/GoalHabitContext.tsx";

interface ExpansibleCardNotesProps {
  title: string;
  note: string;
  date: string;
  id_goal: string;
}
export function ExpansibleCardNotes(props: ExpansibleCardNotesProps) {
  const { title, note, date, id_goal } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const { getNotes } = useGoalHabit();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    const getNotesByGoal = async () => {
      try {
        const NotesData = await getNotes(id_goal);
        console.log(NotesData);
      } catch (error) {
        console.error("Error al obtener las notas:", error);
      }
    };
    getNotesByGoal();
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
              backgroundColor: "rgba(0, 0, 0, 0.7)", // Fondo más oscuro
              zIndex: 999,
            }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        className={`ExpansibleCard ${
          isExpanded ? "ExpandedCard" : "ClosedCard"
        }`}
        style={{
          width: isExpanded ? "50rem" : "100%", // Más grande cuando está expandida
          position: isExpanded ? "fixed" : "relative",
          top: isExpanded ? "50%" : "auto",
          left: isExpanded ? "50%" : "auto",
          transform: isExpanded ? "translate(-50%, -50%)" : "none",
          zIndex: isExpanded ? 1000 : 1,
          padding: isExpanded ? "3rem" : "1rem", // Más padding cuando está expandida
          borderRadius: "12px", // Bordes más redondeados
          backgroundColor: "#1e1e1e", // Fondo más oscuro
          boxShadow: isExpanded
            ? "0 8px 16px rgba(0, 0, 0, 0.3)"
            : "0 4px 8px rgba(0, 0, 0, 0.2)", // Sombra más pronunciada
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        initial={false}
        animate={{
          scale: isExpanded ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        <h3
          style={{
            fontWeight: 600,
            fontSize: isExpanded ? "4rem" : "2rem", // Tamaño de fuente más grande
            color: "#ffffff", // Texto blanco
            marginBottom: isExpanded ? "2rem" : "1rem", // Más margen inferior
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
              <p
                style={{
                  fontSize: "1.5rem", // Tamaño de fuente más grande
                  color: "#ddd", // Texto gris claro
                  lineHeight: "1.6", // Espaciado entre líneas
                  marginBottom: "2rem", // Más margen inferior
                }}
              >
                <strong>{note}</strong>
              </p>
              <p
                style={{
                  fontSize: "1.2rem", // Tamaño de fuente más grande
                  color: "#bbb", // Texto gris
                }}
              >
                <strong>Date:</strong> {formatDate(date)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
