import React from "react";
import ReactDOM from "react-dom";

import SetTime from "./SetTime";
import TimerDisplay from "./TimerDisplay";

import "./style.scss";

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    
    this.alertSound = process.env.PUBLIC_URL + "/assets/pomodoro-alert-JustinBW.mp3";

    this.state = {
      break: 5,
      session: 25,
      activeTimer: "session",
      ticking: false,
      timeLeft: null,
      timeDisplay: null,
      timerID: null
    };
  };

  handleIncrement = (timerType) => {
    this.setState(prevState => {
      if (prevState[timerType] < 60) {
        return prevState[timerType] = prevState[timerType] + 1;
      }
    });
  }

  handleDecrement = (timerType) => {
    this.setState(prevState => {
      if (prevState[timerType] > 1) {
        return prevState[timerType] = prevState[timerType] - 1;
      }
    });
  }

  toggleCountdown = () => {

    if (!this.state.timerID && !this.state.timeLeft) {
      this.handleCountdown();
    }

    this.setState( prevState => {
      if (prevState.ticking) {
        // Clear interval based on timerID
        clearInterval(prevState.timerID);
        return ({
          ticking: false,
          timerID: null
        });
      } else {
        // Create timer and set the ID to the state object so we can clear it later
        let timer = setInterval(this.handleCountdown, 1000);
        return ({
          ticking: true,
          timerID: timer
        });
      }
    });
  }

  addLeadingZero = (int) => {
    // Handle leading zero if only one number
    return int = int.toString().length < 2 ? "0" + int : int;
  }

  handleCountdown = () => {

    // Set initial timer and begin countdown
    if (this.state.timeLeft === null || this.state.timeLeft === 0) {
      let activeTimer = this.state.activeTimer;

      if (this.state.timerID !== null) {
        // timerID is null on first-run or reset so skip this switch
        activeTimer = this.state.activeTimer === "session" ? "break" : "session";

        // Ding that digger!
        document.getElementById("beep").play();

      }

      if (activeTimer === "session") {
        // Convert minutes to seconds
        this.setState(prevState => ({
          activeTimer,
          timeLeft: prevState.session * 60,
          timeDisplay: `${this.addLeadingZero(prevState.session)}:00`
        }));
      } else {
        // let minsInSecs = (this.state.break * 60);
        // minsInSecs =  this.addLeadingZero(minsInSecs);
        this.setState(prevState => ({
          activeTimer,
          timeLeft: prevState.break * 60,
          timeDisplay: `${this.addLeadingZero(prevState.break)}:00`
        }));
      }
    } else {

      this.setState(prevState => {
        let updatedTimeLeft = prevState.timeLeft > 0 ? prevState.timeLeft - 1 : 0;
        
        let mins = Math.floor(updatedTimeLeft / 60);
        let secs = updatedTimeLeft - mins * 60;

        // Handle leading zero if only one number
        mins = this.addLeadingZero(mins);
        secs = this.addLeadingZero(secs);

        if (prevState.timeDisplay === "00:00") {
          return ({
            timeLeft: null,
            timeDisplay: `${mins}:${secs}`
          });

        } else {

          return ({
            timeLeft: updatedTimeLeft,
            timeDisplay: `${mins}:${secs}`
          });

        }

      });
    }
  }

  handleReset = () => {
    
    this.setState(prevState => {
      // Reset audio
      let audio = document.getElementById("beep");
      audio.pause();
      audio.currentTime = 0;

      // Clear timer and reset state
      clearInterval(prevState.timerID);

      return ({
        break: 5,
        session: 25,
        activeTimer: "session",
        ticking: false,
        timeLeft: null,
        timeDisplay: null,
        timerID: null
      });
    });
  }


  render() {
    
    return (
      <div className="pomodoro">
        
        <SetTime 
          timerTitle="Break Length"
          timerType="break"
          timerDefault={this.state.break}
          increaseTime={this.handleIncrement}
          decreaseTime={this.handleDecrement}
        />
        <SetTime 
          timerTitle="Session Length"
          timerType="session"
          timerDefault={this.state.session}
          increaseTime={this.handleIncrement}
          decreaseTime={this.handleDecrement}
        />

        <TimerDisplay 
          startTime={this.state.session}
          timerLabel={this.state.activeTimer}
          timeRemaining={this.state.timeDisplay}
          isTicking={this.state.ticking}
          toggle={this.toggleCountdown}
          reset={this.handleReset}
        />

        <audio id="beep" src={this.alertSound}></audio>
      </div>
    );
  };
}

ReactDOM.render(<Pomodoro />, document.getElementById("root"));