"use client";
import { useChat } from "ai/react";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="max-w-[900px] mx-auto px-4 py-6">
      <div className="grid md:grid-cols-[240px_1fr] gap-5 h-[calc(100vh-140px)]">
        <div className="bg-white rounded-[20px] border border-borderLight p-4 overflow-y-auto hidden md:block">
          <h3 className="text-[13px] font-semibold text-textMuted uppercase tracking-wider mb-2.5">Suggested Prompts</h3>
          <button onClick={() => handleInputChange({ target: { value: "I'm feeling overwhelmed with my syllabus" } } as any)} className="w-full text-left px-3 py-2 rounded-[10px] text-[13px] text-textSecondary hover:bg-lavender hover:text-lavender-text flex items-center gap-2 mb-1 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-lavender-mid shrink-0"></div> Overwhelmed with syllabus
          </button>
          <button onClick={() => handleInputChange({ target: { value: "How do I overcome mock test anxiety?" } } as any)} className="w-full text-left px-3 py-2 rounded-[10px] text-[13px] text-textSecondary hover:bg-lavender hover:text-lavender-text flex items-center gap-2 mb-1 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-lavender-mid shrink-0"></div> Mock test anxiety
          </button>
        </div>

        <div className="bg-white rounded-[20px] border border-borderLight flex flex-col overflow-hidden min-h-[500px]">
          <div className="p-5 border-b border-borderLight flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-lavender-mid to-lavender-deep flex items-center justify-center text-lg">🤖</div>
            <div>
              <h4 className="text-[15px] font-semibold">MindEase AI</h4>
              <span className="text-xs text-sage-deep"><span className="w-2 h-2 rounded-full bg-sage-deep inline-block mr-1"></span>Online</span>
            </div>
          </div>

          <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-3">
            {messages.length === 0 ? (
              <div className="flex justify-center items-center h-full text-textMuted text-sm">Say hi to start the conversation!</div>
            ) : (
              messages.map(m => (
                <div key={m.id} className={`flex gap-2.5 max-w-[85%] ${m.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                  <div className="w-[30px] h-[30px] rounded-full shrink-0 flex items-center justify-center text-sm bg-offWhite">
                    {m.role === 'user' ? '👤' : '🤖'}
                  </div>
                  <div className={`px-3.5 py-2.5 rounded-[16px] text-sm leading-[1.55] ${m.role === 'user' ? 'bg-lavender-deep text-white rounded-br-sm' : 'bg-offWhite text-textPrimary rounded-bl-sm'}`}>
                    {m.content}
                  </div>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-borderLight">
            <div className="flex gap-2.5 items-end">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Message AI..."
                className="flex-1 rounded-[14px] px-3.5 py-[11px] text-sm min-h-[44px] bg-offWhite border border-borderMed focus:border-lavender-deep outline-none"
              />
              <button type="submit" className="bg-lavender-deep text-white px-4 py-2.5 rounded-xl text-sm font-medium">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
