import "../styles/ExpansibleCardInput.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { HabitData } from "../interfaces/HabitData";
import { useGoalHabit } from "../context/GoalHabitContext.tsx";

interface GoalData {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  target: number;
  idUser: string;
  state: boolean;
}

export function ExpansibleCardInput() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GoalData>({
    defaultValues: {
      title: "",
      description: "",
      target: 0,
      start_date: "",
      end_date: "",
    },
  });

  const { getHabits } = useGoalHabit();

  const [isExpanded, setIsExpanded] = useState(true);
  const [habitInput, setHabitInput] = useState<{
    title: string;
    days: string[];
  }>({
    title: "",
    days: [],
  });

  const getHabitsByGoalId = async (goalId: string) => {
    try {
      const HabitData = await getHabits(goalId);
      console.log(HabitData);
    } catch (error) {
      console.error("Error al obtener las metas:", error);
    }
  };

  const [habitList, setHabitList] = useState<HabitData[]>([]);
  const { addGoal, addHabit, getGoals } = useGoalHabit();

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleDayToggle = (day: string) => {
    setHabitInput((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Evita que el formulario se envíe
    }
  };

  const handleSave = async (data: GoalData) => {
    try {
      // Guardar la meta y obtener la meta creada (con ID)
      await addGoal(data);
      const goalsResponse = await getGoals(); // Obtener las metas actualizadas

      if (!goalsResponse || !goalsResponse.goals) {
        throw new Error("We could not get the goals.");
      }

      const goals = goalsResponse.goals;
      const lastGoal = goals[goals.length - 1];

      if (!lastGoal || !lastGoal.id) {
        throw new Error("We could not get the last goal.");
      }

      for (const habit of habitList) {
        const habitData: HabitData = {
          id: crypto.randomUUID(),
          title: habit.title,
          state: false,
          goalId: lastGoal.id,
          createdAt: new Date().toISOString(),
          goalPerWeek: habit.days.length,
          completed: 0,
          days: habit.days,
        };

        await addHabit(habitData, lastGoal.id);
      }

      setIsExpanded(false);
    } catch (error) {
      console.error("Something went wrong while creating the goal:", error);
    }
  };

  return (
    <>
      {/* Fondo oscuro */}
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
          onClick={() => setIsExpanded(false)} // Cierra el formulario al hacer clic fuera
        />
      )}

      {/* Formulario */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className="ExpansibleCardInputContainer" // Clase para posicionamiento
          >
            <div className="ExpandedCardInput">
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: "3.5rem",
                }}
              >
                New Goal
              </h3>
              <form
                style={{ marginTop: "1rem" }}
                className="formInput"
                onSubmit={handleSubmit(handleSave)}
              >
                {/* Inputs del formulario */}
                <p>Title</p>
                <input
                  type="text"
                  {...register("title", { required: "title is required" })}
                  className={errors.title ? "error" : ""}
                  onKeyDown={handleKeyDown}
                />

                <p>Description</p>
                <input
                  type="text"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className={errors.description ? "error" : ""}
                  onKeyDown={handleKeyDown}
                />

                <p>Target</p>
                <input
                  type="number"
                  {...register("target", { required: "Target is required" })}
                  className={errors.target ? "error" : ""}
                  onKeyDown={handleKeyDown}
                />

                <p>Start Date</p>
                <input
                  type="date"
                  {...register("start_date", {
                    required: "Start Date is required",
                  })}
                  className={errors.start_date ? "error" : ""}
                  onKeyDown={handleKeyDown}
                />

                <p>End Date</p>
                <input
                  type="date"
                  {...register("end_date", {
                    required: "End Date is required",
                  })}
                  className={errors.end_date ? "error" : ""}
                  onKeyDown={handleKeyDown}
                />

                <h3 style={{ color: "#ddd" }}>Associated Habits</h3>
                {habitList.map((habit) => (
                  <li key={habit.id}>
                    {habit.title} - {habit.days}
                  </li>
                ))}

                <input
                  type="text"
                  placeholder="Habit title..."
                  value={habitInput.title}
                  onChange={(e) =>
                    setHabitInput((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />

                <div
                  className="habit-days"
                  style={{
                    color: "#ddd",
                    fontSize: "1.0rem",
                    justifyContent: "space-between",
                    display: "flex",
                  }}
                >
                  {daysOfWeek.map((day) => (
                    <label key={day} className="day-checkbox">
                      <input
                        type="checkbox"
                        checked={habitInput.days.includes(day)}
                        onChange={() => handleDayToggle(day)}
                        onKeyDown={handleKeyDown}
                      />
                      {day}
                    </label>
                  ))}
                </div>

                <button
                  type="button"
                  className="CompleteButtonInput"
                  onClick={() => {
                    if (
                      habitInput.title.trim() !== "" &&
                      habitInput.days.length > 0
                    ) {
                      setHabitList((prevHabits) => [
                        ...prevHabits,
                        {
                          id: crypto.randomUUID(),
                          title: habitInput.title,
                          state: false,
                          goalId: "",
                          createdAt: new Date().toISOString(),
                          goalPerWeek: habitInput.days.length,
                          completed: 0,
                          days: habitInput.days.join(", "),
                        },
                      ]);
                      setHabitInput({ title: "", days: [] });
                    }
                  }}
                >
                  Save Habit
                </button>

                <button
                  type="submit"
                  className="CompletedButtonInputSaveGoal"
                  onKeyDown={() => handleKeyDown}
                >
                  Save Goal
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
