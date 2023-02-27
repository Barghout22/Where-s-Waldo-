import React from "react";
//  displayAllScores,
//  displayAllScores: Function;
//  onClick={() => displayAllScores}
const GameEndDisplay = ({ gameEndTime }: { gameEndTime: number }) => {
  return (
    <div className="gameEndDisp">
      <h2 className="introTitle">You found them All! well done!</h2>
      <p className="endgameElement"> your score is {gameEndTime} seconds</p>
      <label className="endgameElement">
        add your name to save your score with it{" "}
        <input type="text" defaultValue={"NA"} placeholder="name" />
      </label>
      <button className="startGameBtn">ok</button>
    </div>
  );
};
export default GameEndDisplay;
