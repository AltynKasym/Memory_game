import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context";
import "./board.scss";
import { card } from "../db";
import { shuffle } from "lodash";
import { Header } from "../components";

function Board() {
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
    reset,
    setReset,
  ] = useContext(Context);

  const [cards, setCards] = useState(shuffle([...card, ...card]));
  const [clicks, setClicks] = useState(0);
  const [won, setWon] = useState(false);
  const [activeCards, setActiveCards] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);
  let users;

  useEffect(() => {
    restart();
  }, [startGame]);

  function restart() {
    setCards(shuffle([...card, ...card]));
    setFoundPairs([]);
    setWon(false);
    setClicks(0);
    setActiveCards([]);
    setTimerReset(true);
  }

  if (localStorage.getItem("users") == null) {
    localStorage.setItem("users", JSON.stringify([]));
  }
  users = JSON.parse(localStorage.getItem("users"));
  let userscore = Math.trunc(clicks / 2) * (minutes * 60 + seconds);

  function collectUsers() {
    if (users.findIndex((user) => user.username === username) >= 0) {
      let userId = users.findIndex((user) => user.username === username);
      let user = users.find((user) => user.username === username);

      if (Math.trunc(clicks / 2) < user.usermove) {
        users[userId] = {
          username: username,
          usermove: Math.trunc(clicks / 2),
          usertime: timer,
          userscore: userscore,
        };
        localStorage.setItem("users", JSON.stringify(users));
      }
      if (Math.trunc(clicks / 2) >= user.usermove) {
        return;
      }
    } else {
      users.push({
        username: username,
        usermove: Math.trunc(clicks / 2),
        usertime: timer,
        userscore: userscore,
      });
      localStorage.setItem("users", JSON.stringify(users));
    }
  }

  function flipCard(index) {
    setClicks(clicks + 1);
    if (won) {
      restart();
    }
    if (activeCards.length === 0) {
      setActiveCards([index]);
    }
    if (activeCards.length === 1) {
      const firstIndex = activeCards[0];
      const secondsIndex = index;
      if (cards[firstIndex] === cards[secondsIndex]) {
        if (foundPairs.length + 2 === cards.length) {
          setWon(true);
          clearInterval(timeInterval);
          collectUsers();
        }

        setFoundPairs([...foundPairs, firstIndex, secondsIndex]);
      }
      setActiveCards([...activeCards, index]);
    }
    if (activeCards.length === 2) {
      setActiveCards([index]);
    }
  }

  return (
    <div className="board ">
      <Header
        username={username}
        clicks={clicks}
        timer={timer}
        userscore={userscore}
        setStartGame={setStartGame}
        restart={restart}
      />

      <div className="board__inner">
        {cards.map((card, index) => {
          const flippedToFront =
            activeCards.indexOf(index) !== -1 ||
            foundPairs.indexOf(index) !== -1;
          return (
            <div
              className={"card-outer " + (flippedToFront ? "flipped" : "")}
              onClick={() => flipCard(index)}
              key={card + index}
            >
              <div
                className={"card " + (flippedToFront ? "flipped" : "")}
                onClick={() => flipCard(index)}
                key={card + index}
              >
                <div className="front">
                  <img src={card.img} alt="" />
                </div>
                <div className="back" />
              </div>
            </div>
          );
        })}
      </div>
      <div className={won || leaderBoard ? "window window-visable" : "window"}>
        {won && (
          <>
            <h2>You won, {username}!</h2>

            <p>Your moves:&nbsp; {Math.trunc(clicks / 2)}</p>

            <p>Your time:&nbsp;{timer}</p>

            <p
              className="window-button"
              onClick={() => {
                restart();
              }}
            >
              Restart
            </p>

            <p
              className="window-button"
              onClick={(e) => {
                setLeaderBoard(true);
                setWon(false);
              }}
            >
              Leaderboard
            </p>
          </>
        )}
        {leaderBoard && (
          <>
            <h2>Leaders</h2>
            <table className="window__leaderboard">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Move</th>
                  <th>Time</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .sort((a, b) => a.userscore - b.userscore)
                  .map((item, id) => {
                    return (
                      <tr key={item + id}>
                        <td>{item.username}</td>
                        <td>{item.usermove}</td>
                        <td>{item.usertime}</td>
                        <td>{item.userscore}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <svg
              className={leaderBoard ? "window__close" : "window__close-hidden"}
              onClick={() => {
                setLeaderBoard(false);
              }}
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 26L26 2M2 2L26 26"
                stroke="#eeeeee"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        )}
      </div>
    </div>
  );
}

export default Board;
