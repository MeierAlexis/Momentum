import "../styles/ExpansibleCardInputNotes.css";
import { useState, useEffect } from "react"; // Importamos useEffect
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useGoalHabit } from "../context/GoalHabitContext.tsx";

export interface NoteData {
  id?: string;
  title: string;
  note: string;
  id_goal: string;
  date: string;
}

export function ExpansibleCardInputNotes() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Usamos setValue para establecer el valor de id_goal en el formulario
  } = useForm<NoteData>({
    defaultValues: {
      title: "",
      note: "",
      date: "",
      id_goal: "", // Inicializamos id_goal vacío
    },
  });

  const { getGoals, createNote } = useGoalHabit(); // Obtenemos getGoals para recuperar las metas
  const [isExpanded, setIsExpanded] = useState(true);
  const [goals, setGoals] = useState<{ id: string; title: string }[]>([]); // Estado para almacenar las metas
  const [selectedGoalId, setSelectedGoalId] = useState<string>(""); // Estado para la meta seleccionada

  // Obtener las metas al cargar el componente
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const goalsData = await getGoals();
        setGoals(goalsData.goals); // Guardamos las metas en el estado
      } catch (error) {
        console.error("Error al obtener las metas:", error);
      }
    };

    fetchGoals();
  }, [getGoals]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Evita que el formulario se envíe
    }
  };

  const handleSave = async (data: NoteData) => {
    try {
      const res = await createNote(data, selectedGoalId);
      console.log(res);
      setIsExpanded(false);
    } catch (error) {
      console.error("Something went wrong while creating the goal:", error);
    }
  };

  // Manejar el cambio de selección en el menú desplegable
  const handleGoalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const goalId = event.target.value;
    setSelectedGoalId(goalId); // Actualizamos la meta seleccionada
    setValue("id_goal", goalId); // Actualizamos el valor en el formulario
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
            className="ExpansibleCardInputContainer"
          >
            <div className="ExpandedCardInput">
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: "3.5rem",
                }}
              >
                New Note
              </h3>
              <form
                style={{ marginTop: "1rem" }}
                className="formInput"
                onSubmit={handleSubmit(handleSave)}
              >
                {/* Menú desplegable para seleccionar la meta */}
                <p>Select Goal</p>
                <select
                  value={selectedGoalId}
                  onChange={handleGoalChange}
                  className={errors.id_goal ? "error" : ""}
                >
                  <option value="">Select a goal</option>
                  {goals.map((goal) => (
                    <option key={goal.id} value={goal.id}>
                      {goal.title}
                    </option>
                  ))}
                </select>

                {/* Inputs del formulario */}
                <p>Title</p>
                <input
                  type="text"
                  {...register("title", { required: "title is required" })}
                  className={errors.title ? "error" : ""}
                  onKeyDown={handleKeyDown}
                />

                <p>Note</p>
                <textarea
                  {...register("note", {
                    required: "Note is required",
                  })}
                  className={errors.note ? "error" : ""}
                />

                <button
                  type="submit"
                  className="CompletedButtonInputNote"
                  onKeyDown={() => handleKeyDown}
                >
                  Save Note
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
