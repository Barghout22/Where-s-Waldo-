import React from "react";
import { useState } from "react";
//  displayAllScores,
//  displayAllScores: Function;
//  onClick={() => displayAllScores}

const GameEndDisplay = ({
  gameEndTime,
  setGameEnd,
  setDisplayAllScores,
  recordUserValues,
  setGameStart,
}: {
  gameEndTime: number;
  setGameEnd: Function;
  setDisplayAllScores: Function;
  recordUserValues: Function;
  setGameStart: Function;
}) => {
  const [userName, setUserName] = useState("NA");
  const recordChange = (e: any) => {
    setUserName(e.target.value);
  };

  const submitValues = () => {
    setGameEnd(false);
    setDisplayAllScores(true);
    if (userName === " ") setUserName("NA");
    recordUserValues({ name: userName, time: gameEndTime });
    setGameStart(false);
  };

  return (
    <div className="gameEndDisp">
      <h2 className="introTitle">You found them All! well done!</h2>
      <p className="endgameElement"> your score is {gameEndTime} seconds</p>
      <label className="endgameElement">
        add your name to save your score with it{" "}
        <input type="text" placeholder="Name" onChange={recordChange} />
      </label>
      <button className="startGameBtn" onClick={submitValues}>
        Submit
      </button>
    </div>
  );
};
export default GameEndDisplay;
