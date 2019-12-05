import React, { useState, useEffect } from "react";
import moment from "moment";
// import CircleProgressBar from "../../components/CircleProgressBar";

const secondsInMinute = 60;
const secondsInDay = 86400;
const secondsInMonth = secondsInDay * moment().daysInMonth();
const daysInYear = moment().isLeapYear() ? 366 : 365;
const secondsInYear = secondsInDay * daysInYear;

const startDay = moment().startOf("day");
const startMonth = moment().startOf("month");

const startWorkDay = moment("10:00", "HH:mm");
const endWorkDay = moment("17:00", "HH:mm");
const workdayDuration = moment
  .duration(endWorkDay.diff(startWorkDay))
  .asSeconds();

const startYear = moment().startOf("year");

const getPercent = (value, totalValue) => {
  return ((value * 100) / totalValue).toFixed(4);
};

const ProgressBars = ({ visible }) => {
  const [now, setNow] = useState(moment());

  const currentSecondsInYear = moment.duration(now.diff(startYear)).asSeconds();
  const currentSecondsInMonth = moment
    .duration(now.diff(startMonth))
    .asSeconds();
  const currentSecondsInDay = moment.duration(now.diff(startDay)).asSeconds();
  const currentSecondsInWorkDay = moment
    .duration(now.diff(startWorkDay))
    .asSeconds();
  const currentSeconds = now.seconds();

  const percentsArr = {
    Year: getPercent(currentSecondsInYear, secondsInYear),
    Month: getPercent(currentSecondsInMonth, secondsInMonth),
    Day: getPercent(currentSecondsInDay, secondsInDay),
    Workday: getPercent(currentSecondsInWorkDay, workdayDuration),
    Minutes: getPercent(currentSeconds, secondsInMinute)
  };

  useEffect(() => {
    const secondsUpdate = setInterval(() => {
      setNow(moment());
    }, 1000);
    return () => {
      clearInterval(secondsUpdate);
    };
  }, []);

  return (
    <div
      className="ProgressBars"
      style={{ visibility: `${visible ? "visible" : "hidden"}` }}
    >
      <div className="ProgressBars__container">
        <h1>Progress</h1>
        {/* {Object.keys(percentsArr).map((param, index) => {
        return (
          <CircleProgressBar
            radius={60}
            percent={percentsArr[param]}
            name={param}
            key={index}
          />
        );
      })} */}
        {Object.keys(percentsArr).map((param, index) => {
          return (
            <div className="progress-item" key={index}>
              <div className="progress-item__head">
                <span>{param}</span> <span>{`${percentsArr[param]}%`}</span>
              </div>
              <progress
                className="progress-item__progress"
                value={percentsArr[param]}
                max={100}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBars;
