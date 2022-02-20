import React, { useState, useEffect } from "react";
import "./index.css";
import {debounce} from 'lodash';
const MOLE_SCORE = 1;
const MOLE = 3;

export default function App() {
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [hitPosition, setHitPosition] = useState();
  const [intervalId, setIntervalId] = useState();
  const [stop, setStop] = useState(false);
  const [won, setWon] = useState(false);
  const [color, setColor] = useState(false);

  useEffect(() => {
    if (playing) {
      let interval = setInterval(() => {
        let randomMole = Math.floor(Math.random() * MOLE) + 1;
        console.log(randomMole);
        setHitPosition(randomMole);
        setColor(false);

      }, 1000);
      setIntervalId(interval)
    }
  }, [playing]);

  const startGame = () => {
    setScore(0);
    setPlaying(true);
    setFinished(false);
    setStop(true);
    setColor(false);
    setWon(false);
  };
  const stopGame = () => {
    setPlaying(false);
    setFinished(true);
    setStop(false);
    clearInterval(intervalId);
  }

  useEffect(() => {
    if (score == 5) {
      setPlaying(false);
      setFinished(true);
      setWon(true);
      clearInterval(intervalId);
    }
  }, [score])
  const whack = (id) => {
    console.log("clicked")
    if(id == hitPosition){
      setScore(score + 1);
      setColor(true);
    }
    else{
      setScore(score - 1);
      setColor(false);
    }
  };
  const moleStyle = (moleHit) => {
    if (moleHit) {
      return {
        backgroundColor: color?"red":"yellow",
        height: "60px",
        width: "60px",
        borderRadius: "30px",
        marginLeft: "10px"
      }
    }
    else {
      return {
        backgroundColor: "black",
        height: "60px",
        width: "60px",
        borderRadius: "30px",
        marginLeft: "10px"
      }
    }

  };
  const molesStyle = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      marginTop: "40px"
  }

  const debouncedClick = debounce((mole)=>{
    whack(mole);
  },1000);

  return (
    <div className="App">
      <div>
        {finished ? (
          <div>
            <h2>{won ? "You have won" : "Game finished"}</h2>
            <h2>Score: {score}</h2>
            <button onClick={startGame}>play again</button>
          </div>
        ) : (
            <div>
              <h1 data-testid="heading">Whack-a-mole</h1>
              <h2>Score: {score}</h2>
              <button data-testid="Startbutton" onClick={stop ? stopGame : startGame}>{stop ? "Stop" : "Start"}</button>
              <div
                style={molesStyle}
              >
                {Array.from({ length: MOLE }, (_, i) => i + 1).map((mole) => (
                  <div
                    key={mole}
                    onClick={() => debouncedClick(mole)}
                    style={
                      moleStyle(hitPosition == mole)
                    }
                  ></div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}


// export default App;
