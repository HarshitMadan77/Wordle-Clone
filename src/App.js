import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import GameOver from './components/GameOver';
import { createContext, useEffect, useState } from 'react';
import { boardDefault, generateWordSet } from './Words';

export const appContext = createContext();

function App() {

  const [board, setBoard] = useState(boardDefault);
  const [ currAttempt, setCurrAttempt ] = useState({ attempt: 0, letterPos: 0 });
  const [ wordSet, setWordSet ] = useState(new Set());
  const [ disabledLetters, setDisabledLetter] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({gameOver: false, guessWord: false});

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const onSelectLetter = (keyVal) => {
    if(currAttempt.letterPos > 4) { return };
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1});
  }

  const onDelete = () => {
    if(currAttempt.letterPos === 0) { return }
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1});
  }

  const onEnter = () => {
    if(currAttempt.letterPos !== 5) { return };

    let currWord = "";
    for(let i = 0; i < 5; i++){
      currWord += board[currAttempt.attempt][i];
    }
    if(wordSet.has(currWord.toLowerCase())){
      setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0})
    }
    else {
      alert("Word Not Found");
    }
    if(currWord.toLowerCase() === correctWord.toLowerCase()){
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    if(currAttempt.attempt === 5){
      setGameOver({ gameOver: true, guessedWord: false});
    }
  };

  return (
    <div className="App">
      <nav>
        <h1>WORDSMITH</h1>
      </nav>
      <appContext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord, setDisabledLetter, disabledLetters, gameOver, setGameOver }}>
        <div className='game'>
          <Board />
          {gameOver.gameOver ? <GameOver/> : <Keyboard />}
        </div>
      </appContext.Provider>
    </div>
  );
}

export default App;
