import { motion, AnimatePresence } from "framer-motion";
import "../styles/WheelOfLifeForm.css";
import { useState, useEffect, useCallback } from "react";
import { useGoalHabit } from "../context/GoalHabitContext.tsx";
import { WheelOfLifeData } from "../interfaces/WheelOfLifeData.ts";

export function WheelOfLifeForm() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [categories, setCategories] = useState({
    friends: 0,
    health: 0,
    fun: 0,
    career: 0,
    money: 0,
    love: 0,
    family: 0,
    spirituality: 0,
  });
  const [error, setError] = useState(null);
  const { updateWheel, getWheel } = useGoalHabit();

  useEffect(() => {
    const fetchWheel = async () => {
      try {
        const wheelData = await getWheel();

        const {
          career,
          family,
          friends,
          fun,
          health,
          love,
          money,
          spirituality,
        } = wheelData.wheel[0];
        setCategories({
          friends,
          fun,
          money,
          family,
          spirituality,
          love,
          career,
          health,
        });
      } catch (error) {
        console.error("Error fetching wheel:", error);
      }
    };

    fetchWheel();
  }, [getWheel]);

  const handleCategoryChange = useCallback((category, value) => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      [category]: value,
    }));
  }, []);

  const handleSubmit = async () => {
    try {
      const wheelUpdateData: WheelOfLifeData = {
        friends: categories.friends,
        health: categories.health,
        fun: categories.fun,
        career: categories.career,
        money: categories.money,
        love: categories.love,
        family: categories.family,
        spirituality: categories.spirituality,
      };
      await updateWheel(wheelUpdateData);
      setIsExpanded(false);
    } catch (error) {
      console.error("Error al actualizar el Wheel:", error);
    }
  };

  const renderSquares = (category, currentValue) => {
    const squareStyle = (index) => ({
      width: "40px",
      height: "40px",
      borderRadius: "10%",
      border: "2px solid #ddd",
      fontFamily: "Poppins",
      backgroundColor: index === currentValue ? "#ff5733" : "transparent",
      color: index === currentValue ? "#ddd" : "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      transition: "background-color 0.2s",
      margin: "4px",
    });

    return Array.from({ length: 11 }, (_, index) => (
      <div
        key={index}
        onClick={() => handleCategoryChange(category, index)}
        style={squareStyle(index)}
        className="square"
      >
        {index}
      </div>
    ));
  };

  const renderCategoryColumn = (categoriesList) => {
    return categoriesList.map(([category, value]) => (
      <div key={category} style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <label
            style={{
              color: "#ddd",
              fontSize: "1.2rem",
              minWidth: "100px",
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </label>
          <span
            style={{
              color: "#ff5733",
              fontSize: "1.2rem",
              fontWeight: "bold",
              marginLeft: "1rem",
            }}
          >
            {value}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "4px",
            flexWrap: "wrap",
          }}
        >
          {renderSquares(category, value)}
        </div>
      </div>
    ));
  };

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
            className="ExpansibleCardInputContainerWheel"
          >
            <div className="ExpandedCardInputWheel">
              <h3
                style={{ fontWeight: 600, fontSize: "3.5rem", color: "#ddd" }}
              >
                Wheel of Life
              </h3>
              {error && (
                <div
                  style={{
                    color: "red",
                    fontSize: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  {error}
                </div>
              )}
              <form
                style={{ marginTop: "1rem" }}
                className="formInputWheel"
                onSubmit={handleSubmit}
              >
                <div style={{ display: "flex", gap: "2rem" }}>
                  <div>
                    {renderCategoryColumn(
                      Object.entries(categories).slice(0, 4)
                    )}
                  </div>
                  <div>
                    {renderCategoryColumn(
                      Object.entries(categories).slice(4, 8)
                    )}
                  </div>
                </div>

                <button type="submit" className="CompletedButtonInputWheel">
                  Save Wheel of Life
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
