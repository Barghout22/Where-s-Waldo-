import React from "react";

const GameStartDisplay = ({
  beginGame,
  searchItems,
}: {
  beginGame: Function;
  searchItems: {
    image: string;
    name: string;
    block: number;
    found: boolean;
  }[];
}) => {
  return (
    <div className="gameStartDisp">
      <h2 className="introTitle">
        find all these characters and unlock a new time score!{" "}
      </h2>
      <ul>
        {searchItems.map((item) => (
          <li key={item.block}>
            <img className="introImage" src={item.image} alt="" />
            {item.name}
          </li>
        ))}
      </ul>

      <button className="startGameBtn" onClick={() => beginGame()}>
        start game!
      </button>
    </div>
  );
};
export default GameStartDisplay;
