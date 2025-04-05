import React from "react";

export default function Logs({ logs }) {
  return (
    <section id="log" className="container">
      <h2>Battle Log</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <span>{log.isPlayer ? "Player" : "Monster"}</span>
            <span>
              {log.isDammage ? " attacked for " : " heals for "}
              <span className={log.isDammage ? "log--damage" : "log--heal"}>{log.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
