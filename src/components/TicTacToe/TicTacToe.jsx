import React, { useRef, useState } from 'react';
import './TicTacToe.css';

let data = ['', '', '', '', '', '', '', '', ''];

const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);

  const toggle = (e, num) => {
    if (lock) {
      return;
    } 
    if (data[num] !== '') {
      return; // Do nothing if the cell is already filled
    }

    if (count % 2 === 0) {
      e.target.innerHTML = `<img src="/cross.png" />`;
      data[num] = 'x';
    } else {
      e.target.innerHTML = `<img src="/circle.png" />`;
      data[num] = 'o';
    }
    setCount(count + 1);
    checkWin();
  };

  const checkWin = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[a]);
        return;
      }
    }

    // Check for draw condition: All cells filled, no winner
    if (data.every(cell => cell !== '') && !lock) {
      setLock(true);
      titleRef.current.innerHTML = "It's a Draw!";
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === 'x') {
      titleRef.current.innerHTML = `Congratulations: <img src="/cross.png" /> Won`;
    } else {
      titleRef.current.innerHTML = `Congratulations: <img src="/circle.png" /> Won`;
    }
  };

  const reset = () => {
    setLock(false);
    data = ['', '', '', '', '', '', '', '', ''];
    setCount(0);
    titleRef.current.innerHTML = "Tic Tac Toe Game";
    // Reset all the boxes' innerHTML to empty
    const boxes = document.querySelectorAll('.boxes');
    boxes.forEach(box => {
      box.innerHTML = '';
    });
  };

  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>Tic Tac Toe Game</h1>
      <div className="board">
        <div className="row1">
          <div className="boxes" onClick={(e) => { toggle(e, 0) }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 1) }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 2) }}></div>
        </div>
        <div className="row2">
          <div className="boxes" onClick={(e) => { toggle(e, 3) }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 4) }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 5) }}></div>
        </div>
        <div className="row3">
          <div className="boxes" onClick={(e) => { toggle(e, 6) }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 7) }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 8) }}></div>
        </div>
      </div>
      <button className="reset" onClick={reset}>Reset</button>
    </div>
  );
};

export default TicTacToe;
