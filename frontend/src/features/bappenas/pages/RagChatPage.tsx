import React, { useState, useEffect, useRef } from 'react';
import { mockRagChatHistory } from '../../../mocks/bappenasData';
import { Send, Bot, User, FileText, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';

const RagChatPage: React.FC = () => {
    const [messages, setMessages] = useState<any[]>([
        { role: 'assistant', content: 'Halo! Saya adalah AI Knowledge Assistant Bappenas. Ada yang bisa saya bantu terkait dokumen RPJMN, Renstra, atau data IKU hari ini?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        
        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: inputValue }]);
        setInputValue('');
        setIsTyping(true);

        // Simulate network delay and "streaming" response
        setTimeout(() => {
            setIsTyping(false);
            // Just return the mock response for any query for the demo
            setMessages(prev => [...prev, mockRagChatHistory[1]]);
        }, 2000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="h-full w-full flex flex-col relative overflow-hidden">
            {/* Header */}
            <header className="p-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-md z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orionBlue to-orionTeal flex items-center justify-center shadow-[0_0_20px_rgba(0,48,255,0.4)]">
                        <Sparkles className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-display font-bold text-white tracking-tight">RAG Knowledge Base</h1>
                        <p className="text-sm text-slate-400">Querying 12,450 embedded RPJMN & Renstra documents.</p>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        {/* Avatar */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-700 text-white' : 'bg-orionBlue text-white'}`}>
                            {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                        </div>
                        
                        {/* Message Bubble */}
                        <div className={`max-w-[75%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-orionBlue text-white rounded-tr-sm' : 'glass-card border-slate-700 text-slate-200 rounded-tl-sm'}`}>
                                <div className="leading-relaxed whitespace-pre-wrap text-sm" dangerouslySetInnerHTML={{__html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}}></div>
                            </div>

                            {/* Citations */}
                            {msg.citations && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {msg.citations.map((cite: any) => (
                                        <div key={cite.id} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 hover:border-orionBlue/50 cursor-pointer transition-colors group">
                                            <FileText size={12} className="text-orionBlue group-hover:text-orionYellow transition-colors" />
                                            <span>{cite.title}</span>
                                            <span className="text-slate-500 ml-1">p.{cite.page}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Feedback Loop */}
                            {msg.role === 'assistant' && idx > 0 && (
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mr-2">Was this helpful?</span>
                                    <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 text-slate-400 hover:text-emerald-400 transition-colors"><ThumbsUp size={14} /></button>
                                    <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 text-slate-400 hover:text-red-400 transition-colors"><ThumbsDown size={14} /></button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-orionBlue text-white flex items-center justify-center shrink-0">
                            <Bot size={20} />
                        </div>
                        <div className="glass-card p-4 rounded-2xl rounded-tl-sm flex items-center gap-1 h-[52px]">
                            <div className="w-2 h-2 rounded-full bg-orionBlue animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 rounded-full bg-orionBlue animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 rounded-full bg-orionBlue animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-slate-900/50 backdrop-blur-md border-t border-white/5 shrink-0">
                <div className="relative max-w-4xl mx-auto">
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about Food Loss strategies in RPJMN..."
                        className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl pl-5 pr-14 py-4 text-slate-200 focus:border-orionBlue focus:ring-1 focus:ring-orionBlue transition-all outline-none resize-none h-[60px] no-scrollbar"
                        rows={1}
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isTyping}
                        className="absolute right-2 top-2 bottom-2 w-11 rounded-xl bg-orionBlue hover:bg-orionBlueDeep disabled:bg-slate-700 disabled:text-slate-500 text-white flex items-center justify-center transition-colors"
                    >
                        <Send size={18} />
                    </button>
                </div>
                <div className="text-center mt-3">
                    <span className="text-[10px] text-slate-500">AI-generated answers. Verify critical policy details with original documents.</span>
                </div>
            </div>
        </div>
    );
};

export default RagChatPage;
