import React, { useState, useContext } from "react";
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
  ] = useContext(Context);

  function getUsername(e) {
    setUsername(e.target.value);
  }

  let timing = timer.split(":");
  let minutes = timing[0];
  let seconds = timing[1];
  console.log("timer", timing);
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

  if (timerReset) {
    clearInterval(timeInterval);
  }

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
      <img src="../images/cards.png" alt="logo" />
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
          className="login__form-submit"
          value="Play"
          onClick={(e) => {
            gameStart(e);
          }}
        />
      </form>

      <p
        className="login__leaderBoard"
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
