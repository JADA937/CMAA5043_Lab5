// Lab 3: In-class tutorials page (simple React patterns)
import { useState } from "react";

function CounterDemo() {
  // Lab 3: state demo used in tutorials
  const [count, setCount] = useState(0);
  return (
    <div className="card">
      <h2>Tutorial — useState Counter</h2>
      <p>Count: {count}</p>
      <div className="courseControls">
        <button type="button" className="btn" onClick={() => setCount((n) => n - 1)}>
          -
        </button>
        <button type="button" className="btn" onClick={() => setCount((n) => n + 1)}>
          +
        </button>
      </div>
    </div>
  );
}

function ConditionalStyleDemo() {
  // Lab 3: ternary + spread syntax demo
  const [on, setOn] = useState(true);

  const base = {
    padding: 14,
    borderRadius: 14,
    border: "1px solid rgba(255, 255, 255, 0.12)"
  };

  const style = on
    ? { ...base, background: "rgba(108, 140, 255, 0.18)" }
    : { ...base, background: "rgba(255, 255, 255, 0.06)" };

  return (
    <div className="card">
      <h2>Tutorial — Spread + Ternary Styles</h2>
      <div style={style}>
        <p>
          This box changes style using <strong>spread syntax</strong> and{" "}
          <strong>ternary operators</strong>.
        </p>
      </div>
      <button type="button" className="moreBtn" onClick={() => setOn((v) => !v)}>
        Toggle
      </button>
    </div>
  );
}

export default function Tutorials() {
  return (
    <div className="portfolio">
      <div className="hero">
        <h1>Lab 3 — In-class Tutorials</h1>
        <p>Small demos included in the submission zip.</p>
      </div>

      <CounterDemo />
      <ConditionalStyleDemo />
    </div>
  );
}

