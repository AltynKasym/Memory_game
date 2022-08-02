import React from "react";

function LeaderBoard(
  users,
  won,
  leaderBoard,
  username,
  clicks,
  timer,
  restart,
  setLeaderBoard,
  setWon
) {
  return (
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
                .sort((a, b) => b.userscore - a.userscore)
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
  );
}

export default LeaderBoard;
