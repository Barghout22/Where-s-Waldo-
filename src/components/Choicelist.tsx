import React from "react";

const Choicelist = ({
  searchItems,
  index,
  checkChoice,
}: {
  searchItems: {
    image: string;
    name: string;
    block: number;
    found: boolean;
  }[];
  index: number;
  checkChoice: Function;
}) => {
  return (
    <div className="choiceList">
      {searchItems.map((item) =>
        item.found ? null : (
          <span
            className="options"
            onClick={() => {
              checkChoice(index, item.name);
            }}
          >
            <img className="characterImage" src={item.image} alt="" />
            {item.name}
          </span>
        )
      )}
    </div>
  );
};

export default Choicelist;
