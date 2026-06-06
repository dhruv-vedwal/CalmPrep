"use client";
import { useChat } from "ai/react";
import { Send, Bot, User, Lightbulb, RotateCcw } from "lucide-react";
import { useRef, useEffect } from "react";

const SUGGESTED_PROMPTS = [
  "I'm overwhelmed by my syllabus and don't know where to start",
  "How can I manage mock test anxiety?",
  "I feel burnt out. What can I do?",
  "Help me build a healthy study routine",
  "How do I deal with comparison with peers?",
  "Give me a 5-minute stress relief technique",
];

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendPrompt = (prompt: string) => {
    handleInputChange({ target: { value: prompt } } as React.ChangeEvent<HTMLInputElement>);
    setTimeout(() => {
      const form = document.getElementById("chat-form") as HTMLFormElement;
      form?.requestSubmit();
    }, 100);
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-6">
      <div className="grid md:grid-cols-[240px_1fr] gap-5" style={{ height: "calc(100vh - 140px)", minHeight: "500px" }}>
        {/* Sidebar */}
        <div className="hidden md:flex flex-col bg-white rounded-[20px] border border-borderLight overflow-hidden">
          <div className="p-4 border-b border-borderLight">
            <h3 className="text-[13px] font-semibold text-textMuted uppercase tracking-wider">Suggested Topics</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => sendPrompt(prompt)}
                className="w-full text-left px-3 py-2.5 rounded-[10px] text-[13px] text-textSecondary hover:bg-lavender hover:text-lavender-text transition-colors flex items-start gap-2 mb-1"
              >
                <Lightbulb className="w-3.5 h-3.5 text-lavender-mid shrink-0 mt-0.5" />
                <span className="leading-snug">{prompt}</span>
              </button>
            ))}
          </div>
          {messages.length > 0 && (
            <div className="p-3 border-t border-borderLight">
              <button
                onClick={() => setMessages([])}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs text-textMuted hover:bg-offWhite transition-colors border border-borderLight"
              >
                <RotateCcw className="w-3 h-3" /> Clear chat
              </button>
            </div>
          )}
        </div>

        {/* Chat area */}
        <div className="flex flex-col bg-white rounded-[20px] border border-borderLight overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b border-borderLight flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-lavender-mid to-lavender-deep flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-textPrimary">MindEase AI</h4>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-sage-deep"></div>
                  <span className="text-xs text-sage-deep font-medium">Online</span>
                </div>
              </div>
            </div>
            <div className="text-[11px] text-textMuted text-right hidden md:block">
              Powered by Gemini 2.5 Flash<br />
              <span className="text-[10px]">Not a replacement for professional help</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="w-16 h-16 rounded-2xl bg-lavender flex items-center justify-center mb-4">
                  <Bot className="w-8 h-8 text-lavender-deep" />
                </div>
                <h3 className="text-base font-semibold text-textPrimary mb-1">Hi, I&apos;m your wellness companion</h3>
                <p className="text-[13px] text-textMuted max-w-[300px] leading-relaxed">
                  I&apos;m here to help you manage stress, build healthy habits, and navigate the pressures of exam prep. What&apos;s on your mind?
                </p>
                {/* Mobile prompts */}
                <div className="mt-4 flex flex-col gap-2 md:hidden w-full">
                  {SUGGESTED_PROMPTS.slice(0, 3).map((p, i) => (
                    <button key={i} onClick={() => sendPrompt(p)} className="text-left text-[13px] bg-lavender text-lavender-text px-3 py-2.5 rounded-xl hover:bg-lavender-mid/60 transition-colors">
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map(m => (
                <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center mt-0.5 ${m.role === "user" ? "bg-lavender-deep" : "bg-lavender"}`}>
                    {m.role === "user"
                      ? <User className="w-4 h-4 text-white" />
                      : <Bot className="w-4 h-4 text-lavender-deep" />
                    }
                  </div>
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-[16px] text-[14px] leading-relaxed ${
                      m.role === "user"
                        ? "bg-lavender-deep text-white rounded-tr-sm"
                        : "bg-offWhite text-textPrimary rounded-tl-sm border border-borderLight"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-lavender flex items-center justify-center">
                  <Bot className="w-4 h-4 text-lavender-deep" />
                </div>
                <div className="bg-offWhite border border-borderLight rounded-[16px] rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-lavender-mid animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-lavender-mid animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-lavender-mid animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form id="chat-form" onSubmit={handleSubmit} className="p-4 border-t border-borderLight">
            <div className="flex gap-2 items-end">
              <textarea
                value={input}
                onChange={e => handleInputChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    (document.getElementById("chat-form") as HTMLFormElement)?.requestSubmit();
                  }
                }}
                placeholder="Type a message... (Enter to send)"
                rows={1}
                className="flex-1 rounded-xl px-4 py-3 text-sm min-h-[44px] max-h-[120px] bg-offWhite border border-borderMed focus:border-lavender-deep outline-none resize-none transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-lavender-deep text-white flex items-center justify-center hover:bg-lavender-text disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-textMuted mt-1.5 text-center">
              AI responses are for wellness support only, not medical advice.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
