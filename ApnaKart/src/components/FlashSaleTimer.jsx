/* Flash sale countdown timer (UI logic only) */
import React from "react";
import { useEffect, useState } from "react";

export default function FlashSaleTimer({ endsAt }) {
  const [remaining, setRemaining] = useState(calcRemaining(endsAt));
  useEffect(() => {
    const id = setInterval(() => setRemaining(calcRemaining(endsAt)), 1000);
    return () => clearInterval(id);
  }, [endsAt]);
  if (remaining.ms <= 0) return <div className="flash-timer">Flash Sale Ended</div>;
  return (
    <div className="flash-timer">
      {remaining.h}h {remaining.m}m {remaining.s}s left
    </div>
  );
}

function calcRemaining(endsAt) {
  const diff = new Date(endsAt).getTime() - Date.now();
  const h = Math.max(0, Math.floor(diff / 3600000));
  const m = Math.max(0, Math.floor((diff % 3600000) / 60000));
  const s = Math.max(0, Math.floor((diff % 60000) / 1000));
  return { h, m, s, ms: diff };
}
