import React, { useContext } from 'react'
import { appContext } from '../App'

function GameOver() {
    const { gameOver, currAttempt, correctWord } = useContext(appContext);

    const handleRestart = () => {
        // Reload the page to restart the game
        window.location.reload();
    };

    return (
        <div className='gameOver'>
            <h3>{gameOver.guessedWord ? "You Guessed Correctly !!" : "You Lost !!"}</h3>
            <h1>Correct Word: {correctWord}</h1>
            {gameOver.guessedWord && (<h3>You Guessed in {currAttempt.attempt} attempts</h3>)}
            <button className="playAgainButton" onClick={handleRestart}>Play Again</button>
        </div>
    )
}

export default GameOver