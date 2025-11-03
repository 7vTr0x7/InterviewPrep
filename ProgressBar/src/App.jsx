import React from "react";
import ProgressBar from "./components/ProgressBar";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const App = () => {
  const [value, setValue] = useState(0);
  const [isRunning, setIsrRunning] = useState(false);

  let intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setValue((prev) => prev + 1);
      }, 50);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const start = () => {
    if (value === 100) setValue(0);
    setIsrRunning(true);
  };
  const pause = () => {
    setIsrRunning(false);
    clearInterval(intervalRef.current);
  };
  const reset = () => {
    setIsrRunning(false);
    clearInterval(intervalRef.current);
    setValue(0);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <h2>Progress Bar</h2>
      <ProgressBar value={value} />
      <div>
        <button onClick={() => start()} disabled={isRunning}>
          Start
        </button>
        <button onClick={() => pause()} disabled={!isRunning}>
          pause
        </button>
        <button onClick={() => reset()}>reset</button>
      </div>
    </div>
  );
};

export default App;
