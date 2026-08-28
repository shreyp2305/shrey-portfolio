"use client";

import { Bot } from "lucide-react";
import { useRef, useState } from "react";
import AIChatBox from "./AIChatBox";

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(true);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Returns focus to the trigger button when the chat is dismissed via the
  // X button or Escape, so keyboard users land back where they started
  // instead of losing their place. Skipped for outside clicks: the user is
  // already moving focus/attention elsewhere on the page, and stealing it
  // back (plus the scroll-into-view that comes with focusing an
  // off-screen trigger) would yank the page out from under their click.
  function closeChatBox({ returnFocus = true }: { returnFocus?: boolean } = {}) {
    setChatBoxOpen(false);
    if (returnFocus) {
      triggerRef.current?.focus();
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setChatBoxOpen(true)}
        className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-transform hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:outline-none"
      >
        <Bot size={20} />
        <span>Ask my AI</span>
      </button>
      <AIChatBox
        open={chatBoxOpen}
        onClose={closeChatBox}
        triggerRef={triggerRef}
      />
    </>
  );
}
