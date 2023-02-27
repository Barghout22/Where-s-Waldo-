import React from "react";

const DisplayScoresScreen = ({
  allUserValues,
  startNewGame,
  setDisplayAllScores,
}: {
  allUserValues: { name: string; time: number }[];
  startNewGame: Function;
  setDisplayAllScores: Function;
}) => {
  return (
    <div className="scoreBoard">
      <span className="scoreBoardDisp">
        <h2 className="scoreboardHeader">ScoreBoard</h2>
        <button
          className="clearBoardBtn"
          onClick={() => {
            startNewGame();
            setDisplayAllScores(false);
          }}
        >
          Play again
        </button>
      </span>
      <ol className="highScoreList" type="1">
        {allUserValues.map((item) => (
          <li className="highScoreItem" key={item.time}>
            {item.name}: {item.time} seconds
          </li>
        ))}
      </ol>
    </div>
  );
};

export default DisplayScoresScreen;
