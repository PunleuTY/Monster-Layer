import { useState } from "react";
import Entity from "./Entity";
import GameOver from "./GameOver";
import Logs from "./Logs";

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default function Game() {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [logs, setLogs] = useState([]);
  const [rounds, setRounds] = useState(0);

  const isGameOver = playerHealth <= 0 || monsterHealth <= 0;
  const winner =
    playerHealth <= 0 && monsterHealth <= 0
      ? "draw"
      : playerHealth <= 0
      ? "monster"
      : monsterHealth <= 0
      ? "player"
      : null;
  const showSpecialAttack = rounds % 3 === 0 && rounds !== 0;

  const addLog = (isPlayer, isDammage, text) => {
    setLogs((prevLogs) => [{ isPlayer, isDammage, text }, ...prevLogs]);
  };

  const attackHandler = () => {
    const playerDmg = getRandomValue(5, 12);
    const monsterDmg = getRandomValue(8, 15);

    setMonsterHealth((prev) => Math.max(prev - playerDmg, 0));
    setPlayerHealth((prev) => Math.max(prev - monsterDmg, 0));

    addLog(true, true, playerDmg);
    addLog(false, true, monsterDmg);
    setRounds((prev) => prev + 1);
  };

  const specialAttackHandler = () => {
    if (!showSpecialAttack) return;

    const playerDmg = getRandomValue(10, 25);
    const monsterDmg = getRandomValue(8, 15);

    setMonsterHealth((prev) => Math.max(prev - playerDmg, 0));
    setPlayerHealth((prev) => Math.max(prev - monsterDmg, 0));

    addLog(true, true, playerDmg);
    addLog(false, true, monsterDmg);
    setRounds((prev) => prev + 1);
  };

  const healHandler = () => {
    const healVal = getRandomValue(8, 20);
    const monsterDmg = getRandomValue(8, 15);

    setPlayerHealth((prev) => Math.min(prev + healVal, 100));
    setPlayerHealth((prev) => Math.max(prev - monsterDmg, 0));

    addLog(true, false, healVal);
    addLog(false, true, monsterDmg);
    setRounds((prev) => prev + 1);
  };

  const surrenderHandler = () => {
    setPlayerHealth(0);
    addLog(true, true, "surrendered");
  };

  const restartGame = () => {
    setPlayerHealth(100);
    setMonsterHealth(100);
    setLogs([]);
    setRounds(0);
  };

  return (
    <>
      <Entity name="Monster" health={monsterHealth} />
      <Entity name="Player" health={playerHealth} />

      {isGameOver && (
        <GameOver
          title={winner === "draw" ? "Draw Game" : winner === "player" ? "You Won!" : "You Lost!"}
          onRestart={restartGame}
        />
      )}

      <section id="controls">
        <button onClick={attackHandler}>ATTACK</button>
        <button onClick={specialAttackHandler} disabled={!showSpecialAttack}>SPECIAL !</button>
        <button onClick={healHandler}>HEAL</button>
        <button onClick={surrenderHandler}>KILL YOURSELF</button>
      </section>

      <Logs logs={logs} />
    </>
  );
}
