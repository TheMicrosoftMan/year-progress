import React, { useState, useEffect } from "react";
import moment from "moment";
import "./styles/main.scss";

const dayOfYear = moment().dayOfYear();
const daysInYear = moment().isLeapYear() ? 366 : 365;

const currentDay = moment().day();
const daysInMonth = moment().daysInMonth();

const secondsInMinutes = moment().minutes() * 60;
const secondsInHour = moment().hour() * 3600;
const currentSecondsInDay = secondsInMinutes + secondsInHour;

const secondsInDay = 86400;

function App() {
  const [seconds, setSeconds] = useState(moment().seconds());

  useEffect(() => {
    const secondsUpdate = setInterval(() => {
      setSeconds(moment().seconds());
    }, 1000);
    return () => {
      clearInterval(secondsUpdate);
    };
  }, []);

  // const radius = 54;
  // const circumference = 2 * Math.PI * radius;
  // const percent = Math.round((seconds * 100) / 60) / 100;

  return (
    <div className="App">
      {/* <svg className="circle" width="120" height="120" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#f77a52"
          strokeWidth="12"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="12"
          strokeDasharray={`${circumference * (1 - percent)} ${circumference}`}
        />
      </svg> */}
      <div className="progress-item">
        <div className="progress-item__head">
          <span>Year</span>{" "}
          <span>{`${Math.round((dayOfYear * 100) / daysInYear)}%`}</span>
        </div>
        <progress
          className="progress-item__progress"
          value={dayOfYear}
          max={daysInYear}
        />
      </div>
      <div className="progress-item">
        <div className="progress-item__head">
          <span>Month</span>{" "}
          <span>{`${Math.round((currentDay * 100) / daysInMonth)}%`}</span>
        </div>
        <progress
          className="progress-item__progress"
          value={currentDay}
          max={daysInMonth}
        />
      </div>
      <div className="progress-item">
        <div className="progress-item__head">
          <span>Day</span>{" "}
          <span>{`${(currentSecondsInDay * 100) / secondsInDay}%`}</span>
        </div>
        <progress
          className="progress-item__progress"
          value={currentSecondsInDay}
          max={secondsInDay}
        />
      </div>
      <div className="progress-item">
        <div className="progress-item__head">
          <span>Minutes</span> <span>{`${(seconds * 100) / 60}%`}</span>
        </div>
        <progress
          className="progress-item__progress"
          value={seconds}
          max={60}
        />
      </div>
    </div>
  );
}

export default App;
