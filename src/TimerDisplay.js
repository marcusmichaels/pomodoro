import React from "react";

const TimerDisplay = (props) => {
  let startTime = "mm:ss";
  
  //  Handle leading zero on startTime less than 10mins
  if (props.timeRemaining === null) {
    startTime = props.startTime.toString().length < 2 ? "0" + props.startTime : props.startTime;
  }

  return (
    <div className="pomodoro__timer">
      <div id="timer-label">{props.timerLabel[0].toUpperCase() + props.timerLabel.slice(1)}</div>
      <div id="time-left">{props.timeRemaining === null ? startTime + ":00" : props.timeRemaining}</div>

      <button id="start_stop" onClick={props.toggle}>{props.isTicking ? "Stop" : "Start"}</button>
      <button id="reset" onClick={props.reset}>Reset</button>
    </div>
  )
}

export default TimerDisplay;