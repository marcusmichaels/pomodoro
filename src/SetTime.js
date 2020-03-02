import React from "react";

const SetTime = (props) => {
  return (
    <div className="pomodoro__adjustment">
      <div id={props.timerType + "-label"}>{props.timerTitle}</div>
      <div id={props.timerType + "-length"}>{props.timerDefault}</div>
      <button id={props.timerType + "-decrement"} onClick={() => {props.decreaseTime(props.timerType)}}>-</button>
      <button id={props.timerType + "-increment"} onClick={() => {props.increaseTime(props.timerType)}}>+</button>
    </div>
  );
}

export default SetTime;