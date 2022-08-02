import React, { useState, useContext, useEffect } from "react";
import "./login.scss";
import { Context } from "../context";
import { logoImage } from "../../images/cards.png";

function Login() {
  let [
    username,
    setUsername,
    startGame,
    setStartGame,
    timer,
    setTimer,
    timeInterval,
    setTimeInterval,
    timerReset,
    setTimerReset,
    leaderBoard,
    setLeaderBoard,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
  ] = useContext(Context);

  function getUsername(e) {
    setUsername(e.target.value);
  }

  let timing = timer.split(":");
  setMinutes(timing[0]);
  setSeconds(timing[1]);
  function startTimer() {
    setTimeInterval(
      setInterval(() => {
        setTimer(
          `${minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds++}` : seconds++
          }`
        );
        if (seconds === 60) {
          minutes++;
          seconds = 0;
        }
      }, 1000)
    );
  }

    // useEffect(() => {
    //   clearInterval(timeInterval);
    //   startTimer();
    // }, []);
  // if (timerReset) {
  //   clearInterval(timeInterval);
  // }

  function gameStart(e) {
    e.preventDefault();
    if (username.trim() !== "") {
      setStartGame(true);
      startTimer();
    } else {
      alert("Введите имя");
    }
  }

  return (
    <div
      className="login"
      style={startGame ? { display: "none" } : { display: "flex" }}
    >
      {/* <img src="../images/cards.png" alt="logo" /> */}
      <h2 className="login-title">Memory Game</h2>
      <form className="login__form">
        <input
          type="text"
          name="first_name"
          className="login__form-username"
          placeholder="Enter your name"
          onChange={(e) => {
            getUsername(e);
          }}
          autoFocus
        />
        <input
          type="submit"
          className="window-button"
          value="Play"
          onClick={(e) => {
            gameStart(e);
          }}
        />
      </form>

      <p
        className="login__leaderBoard window-button"
        onClick={(e) => {
          setLeaderBoard(true);
        }}
      >
        Leaderboard
      </p>
    </div>
  );
}

export default Login;
