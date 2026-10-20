import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { UIMessage } from "ai";
import { Bot, SendHorizonal, Trash, XCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { RefObject, useEffect, useRef, useState } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Canonical targets for this single-page site's anchored sections. Kept in
// sync with the `id="..."` sections in src/app/page.tsx and the `url`
// metadata generate.ts indexes into Astra DB.
const SECTION_LINKS: Record<string, string> = {
  experience: "/#experience",
  projects: "/#projects",
  contact: "/#contact",
};

// The chat model is instructed to always link with a leading `#`
// (`/#projects`), but LLM output is non-deterministic — it occasionally
// "corrects" this to a route-looking path like `/projects`, which 404s on a
// single-page site. Normalize any link that names a known section back to
// its canonical hash form; anything else (external URLs, `/`, mailto:,
// already-correct links) passes through untouched.
function normalizeHref(href: string): string {
  if (!href || href === "/" || href.startsWith("/#") || /^[a-z]+:/i.test(href)) {
    return href;
  }
  const match = href.match(/^\/?#?([a-z-]+)\/?$/i);
  const canonical = match && SECTION_LINKS[match[1].toLowerCase()];
  return canonical ?? href;
}

interface AIChatBoxProps {
  open: boolean;
  onClose: (options?: { returnFocus?: boolean }) => void;
  /** The button that opens this chat box, so focus can be trapped/returned correctly. */
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export default function AIChatBox({ open, onClose, triggerRef }: AIChatBoxProps) {
  const { messages, sendMessage, setMessages, status, error } = useChat();

  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  // Modal-style behavior: Escape closes the chat, clicking outside the
  // panel closes it, and Tab/Shift+Tab is trapped to the panel's own
  // focusable elements while it's open.
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function handlePointerDown(e: MouseEvent) {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      // Once a conversation has started, don't let a stray outside click
      // dismiss the panel — the user has to explicitly close it (Escape
      // or the X button) instead of losing sight of an in-progress chat.
      if (messages.length > 0) return;
      onClose({ returnFocus: false });
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [open, onClose, triggerRef, messages.length]);

  const lastMessageIsUser = messages.at(-1)?.role === "user";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <div
      className={cn(
        "right-0 bottom-0 z-50 w-full max-w-[500px] p-1 xl:right-36",
        open ? "fixed" : "hidden",
      )}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Chat with my AI assistant"
        className="border-border bg-card flex h-[min(600px,85vh)] flex-col overflow-hidden rounded-t-xl border shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
      >
        <div className="border-border bg-primary text-primary-foreground flex flex-none items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <Bot size={20} />
            <span className="font-medium">Ask my AI</span>
          </div>
          <button
            onClick={() => onClose()}
            title="Close chat"
            className="cursor-pointer rounded-full p-1 opacity-80 transition-opacity hover:opacity-100"
          >
            <XCircle size={22} />
          </button>
        </div>
        <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{
                id: "loading",
                role: "assistant",
                parts: [{ type: "text", text: "Thinking..." }],
              }}
            />
          )}
          {error && (
            <ChatMessage
              message={{
                id: "error",
                role: "assistant",
                parts: [
                  {
                    type: "text",
                    text: "Something went wrong. Please try again!",
                  },
                ],
              }}
            />
          )}
          {!error && messages.length === 0 && (
            <div className="mx-8 flex h-full flex-col items-center justify-center gap-3 text-center">
              <Bot size={28} className="text-muted-foreground" />
              <p className="text-lg font-medium">
                Send a message to start the AI chat!
              </p>
              <p className="text-muted-foreground">
                You can ask the chatbot any question about me and it will find
                the relevant information on this website.
              </p>
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="border-border bg-muted/40 flex flex-none gap-1 border-t p-3"
        >
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground flex w-10 flex-none items-center justify-center transition-colors"
            title="Clear chat"
            onClick={() => setMessages([])}
          >
            <Trash size={20} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Say something..."
            className="border-border bg-background ring-primary/20 grow rounded-full border px-4 py-2 transition-shadow outline-none focus:ring-2"
            ref={inputRef}
          />
          <button
            type="submit"
            className="text-primary flex w-10 flex-none items-center justify-center transition-opacity disabled:opacity-30"
            disabled={input.length === 0}
            title="Submit message"
          >
            <SendHorizonal size={22} />
          </button>
        </form>
      </div>
    </div>
  );
}

interface ChatMessageProps {
  message: Pick<UIMessage, "id" | "role" | "parts">;
}
function ChatMessage({ message: { role, parts } }: ChatMessageProps) {
  const isAiMessage = role === "assistant";
  const text = parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");

  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isAiMessage ? "me-5 justify-start" : "ms-5 justify-end",
      )}
    >
      {isAiMessage && <Bot className="text-muted-foreground mr-2 flex-none" />}
      <div
        className={cn(
          "rounded-2xl px-3 py-2",
          isAiMessage ? "bg-muted" : "bg-primary text-primary-foreground",
        )}
      >
        <ReactMarkdown
          components={{
            a: ({ node, ref, ...props }) => (
              <Link
                {...props}
                href={normalizeHref(props.href ?? "")}
                className={cn(
                  "font-medium underline underline-offset-2",
                  isAiMessage
                    ? "text-primary decoration-primary/50 hover:decoration-primary"
                    : "text-primary-foreground decoration-primary-foreground/50 hover:decoration-primary-foreground",
                )}
              />
            ),
            p: ({ node, ...props }) => (
              <p {...props} className="mt-3 first:mt-0" />
            ),
            ul: ({ node, ...props }) => (
              <ul
                {...props}
                className="mt-3 list-inside list-disc first:mt-0"
              />
            ),
            li: ({ node, ...props }) => <li {...props} className="mt-1" />,
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}
