import React from "react";
import "./App.css";
import Header from "./components/Header";
import Choicelist from "./components/Choicelist";
import MeshComponent from "./components/MeshComponent";
import GameStartDisplay from "./components/GameStartDisplay";
import WrongSelectionDisp from "./components/WrongSelectionDisp";
import FoundCharacterDisp from "./components/FoundCharacterDisp";
import GameEndDisplay from "./components/GameEndDisplay";
import DisplayScoresScreen from "./components/DisplayScoresScreen";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import luffy from "./images/luffy.png";
import Yamato from "./images/Yamato.jpg";
import jinbe from "./images/jinbe.png";
import Hawkins from "./images/Hawkins.jpg";
import Apoo from "./images/Apoo.jpg";
import Bartolomeo from "./images/Bartolomeo.jpeg";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBK8LHUDJMheJMJaoLOX-SCl_4cMgrYclw",
  authDomain: "findluffy-81250.firebaseapp.com",
  projectId: "findluffy-81250",
  storageBucket: "findluffy-81250.appspot.com",
  messagingSenderId: "509687126544",
  appId: "1:509687126544:web:81afde02034783c7154895",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [displayAllScores, setDisplayAllScores] = useState(false);
  const [gameBeginTime, setGameBeginTime] = useState(0);
  const [gameEndTime, setGameEndTime] = useState(0);
  const [allUserValues, setAllUserValues] = useState([
    { name: "NA", time: -1 },
  ]);
  const [foundCharacter, setFoundCharacter] = useState("None");
  const [madeWrongSelection, setMadeWrongSelection] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isActive, setIsActive] = useState(-1);
  const [previouslyClicked, setPreviouslyClicked] = useState([-1]);
  const [searchItems, setSearchItems] = useState([
    { image: luffy, name: "Luffy", block: 58, found: false },
    { image: Yamato, name: "Yamato", block: 303, found: false },
    { image: jinbe, name: "Jinbe", block: 128, found: false },
    { image: Hawkins, name: "Hawkins", block: 198, found: false },
    { image: Apoo, name: "Apoo", block: 242, found: false },
    { image: Bartolomeo, name: "Bartolomeo", block: 88, found: false },
  ]);

  function checkChoice(index: number, name: string) {
    displayItem(index);
    let myItems = searchItems;
    let itemChecked = myItems.find((item) => item.name === name);
    let posOfItem = myItems.findIndex((item) => item.name === name);
    if (itemChecked!.block === index) {
      itemChecked!.found = true;
      myItems.splice(posOfItem, 1, itemChecked!);
      setSearchItems(myItems);
      setPreviouslyClicked([...previouslyClicked, index]);
      if (previouslyClicked.length === 6) {
        const time =
          new Date().getHours() * 60 * 60 +
          new Date().getMinutes() * 60 +
          new Date().getSeconds();
        setGameEndTime(time - gameBeginTime);
        setGameEnd(true);
      }
      setFoundCharacter(name);
      setTimeout(() => {
        setFoundCharacter("None");
      }, 1500);
    } else {
      setMadeWrongSelection(true);
      setTimeout(() => {
        setMadeWrongSelection(false);
      }, 1500);
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

  function beginGame() {
    setGameStart(true);
    setGameBeginTime(
      new Date().getHours() * 60 * 60 +
        new Date().getMinutes() * 60 +
        new Date().getSeconds()
    );
    let allItems = searchItems;
    allItems.forEach((item) => {
      item.found = false;
    });
    setSearchItems(allItems);
    setPreviouslyClicked([-1]);
  }
  function updateUserValues(userValue: { name: string; time: number }) {
    let allValues = allUserValues;
    for (let i = 0; i < allValues.length; i++) {
      if (userValue.time < allValues[i].time) {
        allValues.splice(i, 0, userValue);
        allValues = allValues.filter((items) => items.time >= 0);
        setAllUserValues(allValues);
        return;
      }
    }
    allValues.push(userValue);
    allValues = allValues.filter((items) => items.time >= 0);
    setAllUserValues(allValues);
  }
  let items = [0];
  for (let i = 1; i < 345; i++) {
    items.push(i);
  }

  return (
    <div className="App">
      {!gameStart && !displayAllScores && (
        <GameStartDisplay beginGame={beginGame} searchItems={searchItems} />
      )}
      {gameStart && !gameEnd && (
        <div className="main">
          <Header searchItems={searchItems} />
          {foundCharacter !== "None" && (
            <FoundCharacterDisp name={foundCharacter} />
          )}
          {madeWrongSelection && <WrongSelectionDisp />}
          {items.map((index) => (
            <div key={index}>
              <MeshComponent
                index={index}
                isActive={isActive}
                previouslyClicked={previouslyClicked}
                displayItem={displayItem}
              />
              {isActive === index && (
                <Choicelist
                  searchItems={searchItems}
                  index={index}
                  checkChoice={checkChoice}
                />
              )}
            </div>
          ))}
        </div>
      )}
      {gameEnd && (
        <GameEndDisplay
          gameEndTime={gameEndTime}
          setGameEnd={setGameEnd}
          setDisplayAllScores={setDisplayAllScores}
          recordUserValues={updateUserValues}
          setGameStart={setGameStart}
        />
      )}{" "}
      {/* //scoreboard here */}
      {
        displayAllScores && (
          <DisplayScoresScreen
            allUserValues={allUserValues}
            startNewGame={beginGame}
            setDisplayAllScores={setDisplayAllScores}
          />
        )

        // <div>
        //   <h2>ScoreBoard</h2>
        //   <ol>
        //     {allUserValues.map((item) => (
        //       <li>
        //         {item.name}:{item.time}seconds
        //       </li>
        //     ))}
        //   </ol>
        // </div>
      }
    </div>
  );
}

export default App;

// displayAllScores = {};
