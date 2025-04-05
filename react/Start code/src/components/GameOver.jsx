import React from "react";

export default function GameOver({ title, onRestart }) {
  return (
    <section className="container">
      <h2>Game Over!</h2>
      <h3>{title}</h3>
      <button onClick={onRestart}>Start New Game</button>
    </section>
  );
}
