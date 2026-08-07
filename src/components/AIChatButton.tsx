"use client";

import { Bot } from "lucide-react";
import { useState } from "react";
import AIChatBox from "./AIChatBox";

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(true);

  return (
    <>
      <button
        onClick={() => setChatBoxOpen(true)}
        className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-transform hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:outline-none"
      >
        <Bot size={20} />
        <span>Ask my AI</span>
      </button>
      <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </>
  );
}
