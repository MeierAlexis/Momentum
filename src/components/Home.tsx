import "../styles/Home.css";
import Lottie from "react-lottie-player";
import { useState } from "react";
import animationData from "../../public/New-Year.json";
import GlowingButton from "./GlowingButton";

function Home() {
  const [isStopped, setIsStopped] = useState(false);

  const handleComplete = () => {
    setIsStopped(true); // Stop the animation when it completes
  };

  return (
    <div className="home">
      <div className="section1">
        <h1 className="title">MOMENTUM</h1>
        <p className="text">
          <span style={{ fontWeight: "bold" }}>Never </span>has it been so easy
          to achieve your goals
        </p>
        <GlowingButton text="TRY IT NOW" />
      </div>
      <Lottie
        animationData={animationData}
        loop={false}
        play={!isStopped}
        style={{ width: 600, height: 600 }}
        onComplete={handleComplete}
      />
    </div>
  );
}

export default Home;
