import React from "react";

const Header = ({
  searchItems,
}: {
  searchItems: {
    image: string;
    name: string;
    block: number;
    found: boolean;
  }[];
}) => {
  return (
    <div className="header">
      <h1 className="gameTitle">Find Luffy</h1>
      {searchItems.map((item) => (
        <div
          key={item.block}
          className={item.found ? "foundOption" : "notFoundOption"}
        >
          <img src={item.image} className="characterImage" alt=""></img>
        </div>
      ))}{" "}
    </div>
  );
};

export default Header;
