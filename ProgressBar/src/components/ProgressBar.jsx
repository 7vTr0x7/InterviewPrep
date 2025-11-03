import React from "react";

const ProgressBar = ({ value }) => {
  const progress = Math.min(100, Math.max(value, 0));

  return (
    <div
      style={{
        width: "60%",
        border: "1px solid black",
        height: "20px",
        borderRadius: "10px",
        overflow: "hidden",
      }}>
      <div
        style={{
          width: `${progress}%`,
          backgroundColor: "blue",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          color: "white",
        }}>
        {progress}
      </div>
    </div>
  );
};

export default ProgressBar;
