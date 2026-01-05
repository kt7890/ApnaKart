/* Live chat UI: AI stylist + human support simulation */
import React from "react";
import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("ai");
  const [messages, setMessages] = useState([
    { from: "ai", text: "Namaste! I’m your ApnaKart stylist 👗 How can I help?" }
  ]);
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    const userMsg = { from: "you", text: input.trim() };
    const reply =
      tab === "ai"
        ? { from: "ai", text: "Try cotton for summer. Pair T-Shirt with Jeans for casual." }
        : { from: "human", text: "We’ll get back shortly. Meanwhile, check our FAQs." };
    setMessages(prev => [...prev, userMsg, reply]);
    setInput("");
  }

  return (
    <>
      <button className="btn accent chat-fab" onClick={() => setOpen(!open)}>
        {open ? "Close Chat" : "Chat"}
      </button>
      {open && (
        <div className="chat-box">
          <div className="chat-header row-between">
            <div>ApnaKart Support</div>
            <div className="row">
              <button className={`pill ${tab === "ai" ? "active" : ""}`} onClick={() => setTab("ai")}>AI Stylist</button>
              <button className={`pill ${tab === "human" ? "active" : ""}`} onClick={() => setTab("human")}>Human</button>
            </div>
          </div>
          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className="chat-msg">
                <b>{m.from.toUpperCase()}:</b> {m.text}
              </div>
            ))}
          </div>
          <div style={{ padding: 10 }} className="row">
            <input className="input" value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." />
            <button className="btn primary" onClick={send}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
