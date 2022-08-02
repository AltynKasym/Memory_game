import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context";
import "./board.scss";
import { card } from "../db";
import { shuffle } from "lodash";

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
  ] = useContext(Context);

  const [cards, setCards] = useState(shuffle([...card, ...card]));
  const [clicks, setClicks] = useState(0);
  const [won, setWon] = useState(false);
  const [activeCards, setActiveCards] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);
  let users;

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

  function collectUsers() {
    if (users.findIndex((user) => user.username === username) >= 0) {
      let userId = users.findIndex((user) => user.username === username);
      let user = users.find((user) => user.username === username);

      if (Math.trunc(clicks / 2) < user.usermove) {
        users[userId] = {
          username: username,
          usermove: Math.trunc(clicks / 2),
          usertime: timer,
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
        // firstIndex.style = "opacity:0";
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
      <div className="stats">
        <p>Player: {username}</p>
        <p>Moves: {Math.trunc(clicks / 2)}</p>
        <p className="stats__timer" value="sdf">
          {timer}
        </p>
        <p className="stats__restart" onClick={restart}>
          Restart
        </p>
      </div>
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
              <div className="card">
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
            You won!
            <br />
            Your moves:{Math.trunc(clicks / 2)}
            <br />
            Your time:{timer}
            <br />
            <p
              onClick={() => {
                restart();
              }}
            >
              restart
            </p>
            <br />
            <br />
            <p
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
            Leaders
            <table>
              <tr>
                <th>Username</th>
                <th>Move</th>
                <th>Time</th>
              </tr>
              {users.map((item) => {
                return (
                  <tr>
                    <td>{item.username}</td>
                    <td>{item.usermove}</td>
                    <td>{item.usertime}</td>
                  </tr>
                );
              })}
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
