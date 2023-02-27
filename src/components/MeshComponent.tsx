import React from "react";

const MeshComponent = ({
  index,
  isActive,
  previouslyClicked,
  displayItem,
}: {
  index: number;
  isActive: number;
  previouslyClicked: number[];
  displayItem: Function;
}) => {
  return (
    <div
      className={
        isActive === index
          ? "containerItem display"
          : previouslyClicked.includes(index)
          ? "containerItem found"
          : "containerItem "
      }
      onClick={() => {
        displayItem(index);
      }}
    >
      {" "}
    </div>
  );
  
};

export default MeshComponent;
