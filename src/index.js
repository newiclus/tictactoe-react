import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

const squareInputStyle = {
  'border': '0 none',
  'width':'100%',
  'height':'100%',
  'backgroundColor': '#ddd',
  'textAlign': 'center',
  'fontSize': '2em'
}

const Square = ({index, onPlay, value, disabled}) => {
  const handleClick = () => {
    if (value === '') {
      onPlay(index);
    }
  }

  return (
    <div className="square" style={squareStyle}>
      <button 
        style={squareInputStyle} 
        onClick={handleClick}
        disabled={disabled}
      >
        {value}
      </button>
      
    </div>
  );
}
 

const Board = () => {
  const [movements, setMovements] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('x');
  const [endGame, setEndGame] = useState(false);
  const [winner, setWinner] = useState('None');

  const checkWinner = (listMovements, symbol) => {
    const tictactoe = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    return tictactoe.some((move) => (
      move.every((i) => listMovements[i] === symbol)
    ));
  }

  const handleMove = (index) => {
    const newMovements = [...movements];
    const nextPlayer = currentPlayer === 'x' ? 'o' : 'x';
    newMovements[index] = currentPlayer;
    
    if (newMovements.length > 4) {
      setEndGame(checkWinner(newMovements, currentPlayer));
      setWinner(currentPlayer);
    }

    setMovements(newMovements);
    setCurrentPlayer(nextPlayer);
  }

  const resetGame = () => {
    setMovements([]);
    setCurrentPlayer('x');
    setEndGame(false);
  }
  
  return (
    <div style={containerStyle} className="gameBoard">
      <div className="status" style={instructionsStyle}>Next player: {currentPlayer.toUpperCase()}</div>
      <div className="winner" style={instructionsStyle}>{endGame ? `Winner: ${winner.toUpperCase()}` : ''}</div>

      <button style={buttonStyle} onClick={resetGame}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square index={0} onPlay={handleMove} value={movements[0] || ''} disabled={endGame} />
          <Square index={1} onPlay={handleMove} value={movements[1] || ''} disabled={endGame} />
          <Square index={2} onPlay={handleMove} value={movements[2] || ''} disabled={endGame} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square index={3} onPlay={handleMove} value={movements[3] || ''} disabled={endGame} />
          <Square index={4} onPlay={handleMove} value={movements[4] || ''} disabled={endGame} />
          <Square index={5} onPlay={handleMove} value={movements[5] || ''} disabled={endGame} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square index={6} onPlay={handleMove} value={movements[6] || ''} disabled={endGame} />
          <Square index={7} onPlay={handleMove} value={movements[7] || ''} disabled={endGame} />
          <Square index={8} onPlay={handleMove} value={movements[8] || ''} disabled={endGame} />
        </div>
      </div>
    </div>
  );
};

const Game = () => (
  <div className="game">
    <div className="game-board">
      <Board />
    </div>
  </div>
);

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);