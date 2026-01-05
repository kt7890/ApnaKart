/* Style quiz: suggests outfits and applies discount based on score */
import React from "react";
import { useState } from "react";
import { useApp } from "../state/AppContext.jsx";

export default function StyleQuiz() {
  const { applyCoupon } = useApp();
  const [answers, setAnswers] = useState({ season: "", vibe: "", budget: "" });
  const [result, setResult] = useState(null);

  function submit() {
    const score = ["season", "vibe", "budget"].reduce((s, k) => s + (answers[k] ? 1 : 0), 0);
    const suggestion = score >= 2 ? "Cotton for summer casuals; Silk for festive outfits." : "Explore New Arrivals for inspiration.";
    setResult({ score, suggestion });
    if (score === 3) applyCoupon("QUIZ5");
  }

  return (
    <div className="card">
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Style Quiz</div>
      <div className="grid">
        <select value={answers.season} onChange={e => setAnswers(a => ({ ...a, season: e.target.value }))}>
          <option value="">Preferred Season</option>
          <option value="summer">Summer</option>
          <option value="winter">Winter</option>
          <option value="festive">Festive</option>
        </select>
        <select value={answers.vibe} onChange={e => setAnswers(a => ({ ...a, vibe: e.target.value }))}>
          <option value="">Fashion Vibe</option>
          <option value="casual">Casual</option>
          <option value="party">Party</option>
          <option value="ethnic">Ethnic</option>
        </select>
        <select value={answers.budget} onChange={e => setAnswers(a => ({ ...a, budget: e.target.value }))}>
          <option value="">Budget</option>
          <option value="value">Value</option>
          <option value="mid">Mid-range</option>
          <option value="premium">Premium</option>
        </select>
      </div>
      <button className="btn primary" style={{ marginTop: 8 }} onClick={submit}>Get Suggestions</button>
      {result && (
        <div className="card" style={{ marginTop: 8 }}>
          <div>Quiz Score: {result.score} / 3</div>
          <div>{result.suggestion}</div>
          {result.score === 3 && <div className="discount">Discount Applied: QUIZ5</div>}
        </div>
      )}
    </div>
  );
}
