import "./App.scss";
import { Header, Board, Login } from "./components/components";
import { Context } from "./components/context";
import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [startGame, setStartGame] = useState(false);
  let [timeInterval, setTimeInterval] = useState(null);
  let [timer, setTimer] = useState("0:00");
  let [timerReset, setTimerReset] = useState(false);
  let [leaderBoard, setLeaderBoard] = useState(false);

  return (
    <div className="App">
      <Context.Provider
        value={[
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
        ]}
      >
        <Login />
        <Board />
      </Context.Provider>
    </div>
  );
}

export default App;
