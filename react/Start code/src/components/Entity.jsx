import React from "react";

export default function Entity({ name, health }) {
  return (
    <section className="container">
      <h2>{name} Health</h2>
      <div className="healthbar">
        <div className="healthbar__value" style={{ width: `${health}%` }}></div>
      </div>
    </section>
  );
}
