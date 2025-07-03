import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";
import "./countdown.css"; // Ensure you have the CSS file for styling

dayjs.extend(duration);

const TARGET_DATE = dayjs("2025-09-13T19:00:00");

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = dayjs();
    const diff = TARGET_DATE.diff(now);
    const dur = dayjs.duration(diff);
    return {
      days: Math.floor(dur.asDays()),
      hours: dur.hours(),
      minutes: dur.minutes(),
      seconds: dur.seconds(),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-wrapper">
      <div className="overlay" />
      <div className="content">
        <p className="save-text">SANANI BELGILAB QO‘YING</p>
        <h1>TO‘YIMIZGACHA QOLDI</h1>
        <div className="countdown-box">
          {[
            ["days", "kun"],
            ["hours", "soat"],
            ["minutes", "daqiqa"],
            ["seconds", "soniya"],
          ].map((unit) => (
            <div key={unit} className="time-unit">
              <span className="number">
                {String(timeLeft[unit[0]]).padStart(2, "0")}
              </span>
              <span className="label">
                {unit[1].charAt(0).toUpperCase() + unit[1].slice(1)}
              </span>
            </div>
          ))}
        </div>
        <p className="save-text">2025-yilning 14-sentabr kuni.</p>
      </div>
    </div>
  );
};

export default Countdown;
