import React from "react";
import { Star } from "react-feather";

const FractionalStar = ({ fillPercent = 0 }) => {
  return (
    <div style={{ position: "relative", display: "inline-block", width: 20, height: 20 }}>
      {/* Grey star in background */}
      <Star size={20} stroke="gray" fill="none" />

      {/* Gold star overlay, clipped by fillPercent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${fillPercent}%`,
          overflow: "hidden",
        }}
      >
        <Star size={20} stroke="gold" fill="gold" />
      </div>
    </div>
  );
};

export default FractionalStar;
