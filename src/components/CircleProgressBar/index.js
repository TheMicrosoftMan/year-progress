import React from "react";

const CircleProgressBar = ({ radius, percent }) => {
  const circumference = 2 * Math.PI * radius;
  const size = (radius + 10) * 2;

  return (
    <svg
      className="circle"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        cx={`50%`}
        cy={`50%`}
        r={radius}
        fill="none"
        stroke="#f77a52"
        strokeWidth="10"
      />
      <circle
        cx={`50%`}
        cy={`50%`}
        r={radius}
        fill="none"
        stroke="#e6e6e6"
        strokeWidth="10"
        strokeDasharray={`${circumference *
          (1 - percent / 100)} ${circumference}`}
      />
    </svg>
  );
};

export default CircleProgressBar;
