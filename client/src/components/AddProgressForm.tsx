import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoalData } from "../interfaces/GoalData";
import "../styles/ExpansibleCardInputNotes.css"; // Importar los estilos
import { useGoalHabit } from "../context/GoalHabitContext.tsx";
import { ProgressData } from "../interfaces/ProgressData.ts";

interface AddProgressFormProps {
  goals: GoalData[];
  selectedGoalId: string | null;
  onSelectGoal: (goalId: string) => void;
}

export function AddProgressForm({
  goals,
  selectedGoalId,
  onSelectGoal,
}: AddProgressFormProps) {
  const [progress, setProgress] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const { addProgress } = useGoalHabit();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const progressData: ProgressData = {
      id_goal: selectedGoalId || "",
      progress,
    };
    console.log(progressData);
    if (selectedGoalId && progress > 0) {
      await addProgress(progressData, selectedGoalId);
      setProgress(0);
      setIsExpanded(false);
    }
  };
  const getActiveGoals = () => goals.filter((goal) => !goal.state);
  return (
    <>
      {isExpanded && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={() => setIsExpanded(false)}
        />
      )}

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className="ExpansibleCardInputContainerNotes"
          >
            <div className="ExpandedCardInput">
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: "3.5rem",
                  color: "#ddd",
                }}
              >
                Add Progress
              </h3>
              <form
                style={{ marginTop: "1rem" }}
                className="formInput"
                onSubmit={handleSubmit}
              >
                <p>Select Goal</p>
                <select
                  value={selectedGoalId || ""}
                  onChange={(e) => onSelectGoal(e.target.value)}
                >
                  <option value="" disabled>
                    Select a goal
                  </option>
                  {getActiveGoals().map((goal) => (
                    <option key={goal.id} value={goal.id}>
                      {goal.title}
                    </option>
                  ))}
                </select>

                <p>Progress</p>
                <input
                  type="number"
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  min="0"
                />

                <button type="submit" className="CompletedButtonInputNote">
                  Add Progress
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
