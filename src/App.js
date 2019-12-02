import React, { useState, useEffect } from "react";
import moment from "moment";
import "./styles/main.scss";
import CircleProgressBar from "./components/CircleProgressBar";

const dayOfYear = moment().dayOfYear();
const daysInYear = moment().isLeapYear() ? 366 : 365;

const currentDay = moment().day();
const daysInMonth = moment().daysInMonth();

const secondsInMinutes = moment().minutes() * 60;
const secondsInHour = moment().hour() * 3600;
const currentSecondsInDay = secondsInMinutes + secondsInHour;

const secondsInDay = 86400;

const getPercent = (value, totalValue) => {
  return Math.round((value * 100) / totalValue);
};

function App() {
  const [seconds, setSeconds] = useState(moment().seconds());

  const percentsArr = {
    year: getPercent(dayOfYear, daysInYear),
    month: getPercent(currentDay, daysInMonth),
    day: getPercent(currentSecondsInDay, secondsInDay),
    minute: getPercent(seconds, 60)
  };

  useEffect(() => {
    const secondsUpdate = setInterval(() => {
      setSeconds(moment().seconds());
    }, 1000);
    return () => {
      clearInterval(secondsUpdate);
    };
  }, []);

  return (
    <div className="App">
      <CircleProgressBar radius={60} percent={percentsArr.year} name="Year" />
      <CircleProgressBar radius={60} percent={percentsArr.month} name="Month" />
      <CircleProgressBar radius={60} percent={percentsArr.day} name="Day" />
      <CircleProgressBar
        radius={60}
        percent={percentsArr.minute}
        name="Minutes"
      />
      <div className="progress-item">
        <div className="progress-item__head">
          <span>Year</span> <span>{`${percentsArr.year}%`}</span>
        </div>
        <progress
          className="progress-item__progress"
          value={dayOfYear}
          max={daysInYear}
        />
      </div>
      <div className="progress-item">
        <div className="progress-item__head">
          <span>Month</span> <span>{`${percentsArr.month}%`}</span>
        </div>
        <progress
          className="progress-item__progress"
          value={currentDay}
          max={daysInMonth}
        />
      </div>
      <div className="progress-item">
        <div className="progress-item__head">
          <span>Day</span> <span>{`${percentsArr.day}%`}</span>
        </div>
        <progress
          className="progress-item__progress"
          value={currentSecondsInDay}
          max={secondsInDay}
        />
      </div>
      <div className="progress-item">
        <div className="progress-item__head">
          <span>Minutes</span> <span>{`${percentsArr.minute}%`}</span>
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
