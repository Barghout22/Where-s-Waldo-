import React from "react";
import "./App.css";
// import wheresLuffy from "./images/wheresLuffy.png";
import { useState } from "react";
// const uniqid = require("uniqid");
function App() {
  const [clicked, setClicked] = useState(false);
  const [isActive, setIsActive] = useState(-1);
  const [previouslyClicked, setPreviouslyClicked] = useState([-1]);
  const [searchItems, setSearchItems] = useState([
    { name: "Luffy", block: 58, found: false },
    { name: "Yamato", block: 303, found: false },
    { name: "Jinbe", block: 128, found: false },
    { name: "Hawkins", block: 198, found: false },
    { name: "Apoo", block: 242, found: false },
    { name: "Waldo", block: 283, found: false },
    { name: "Bartolomeo", block: 88, found: false },
  ]);

  function checkChoice(index: number, name: string) {
    setClicked(false);
    let myItems = searchItems;
    let itemChecked = myItems.find((item) => item.name === name);
    let posOfItem = myItems.findIndex((item) => item.name === name);
    if (itemChecked!.block === index) {
      itemChecked!.found = true;
      myItems.splice(posOfItem, 1, itemChecked!);
      setSearchItems(myItems);
      setPreviouslyClicked([...previouslyClicked, index]);
    } else {
    }
  }

  function displayItem(number: number) {
    if (previouslyClicked.includes(number)) return;
    if (!clicked) {
      setClicked(true);
      setIsActive(number);
    } else {
      setClicked(false);
      setIsActive(-1);
    }
  }
  let items = [0];
  for (let i = 1; i < 345; i++) {
    items.push(i);
  }

  return (
    <div className="App">
      {/* <header>
        <h1>Find Luffy</h1>
        <span>Luffy</span>
        <span>Momonosuke</span>
        <span>Aokiji</span>
        <span>Basel Hawkins</span>
        <span>Scratchmen Apoo</span>
        <span>Jinbe</span>
        <span>Waldo</span>
      </header> 
       onClick={displayClick}
       style={myListStyle}
      */}
      <div className="main">
        {items.map((item, index) => (
          <div key={index}>
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
              {/* {item} */}
            </div>
            {isActive === index && (
              <div>
                {/* <div className="clickBox" style={mystyle}></div> */}
                <div className="choiceList">
                  {!searchItems[0].found && (
                    <span
                      className="options "
                      onClick={() => {
                        checkChoice(index, "Luffy");
                      }}
                    >
                      Luffy
                    </span>
                  )}
                  {!searchItems[1].found && (
                    <span
                      className="options "
                      onClick={() => {
                        checkChoice(index, "Yamato");
                      }}
                    >
                      Yamato
                    </span>
                  )}
                  {!searchItems[2].found && (
                    <span
                      className="options "
                      onClick={() => {
                        checkChoice(index, "Jinbe");
                      }}
                    >
                      Jinbe
                    </span>
                  )}
                  {!searchItems[3].found && (
                    <span
                      className="options"
                      onClick={() => {
                        checkChoice(index, "Hawkins");
                      }}
                    >
                      Basel Hawkins
                    </span>
                  )}
                  {!searchItems[4].found && (
                    <span
                      className="options"
                      onClick={() => {
                        checkChoice(index, "Apoo");
                      }}
                    >
                      Scratchmen Apoo
                    </span>
                  )}
                  {!searchItems[5].found && (
                    <span
                      className="options "
                      onClick={() => {
                        checkChoice(index, "Waldo");
                      }}
                    >
                      Waldo
                    </span>
                  )}
                  {!searchItems[6].found && (
                    <span
                      className="options "
                      onClick={() => {
                        checkChoice(index, "Bartolomeo");
                      }}
                    >
                      Bartolomeo
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* <div className="footer">
        image credit goes to{" "}
        <a href="https://www.reddit.com/r/OnePiece/comments/olbv3f/heres_the_collab_between_wheres_wally_and_op/">
          This post on reddit
        </a>
      </div> */}
    </div>
  );
}

export default App;
