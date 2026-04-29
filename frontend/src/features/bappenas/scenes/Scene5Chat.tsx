import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { mockRagChatHistory } from '../../../mocks/bappenasData';
import { Send, Bot, User, FileText, Sparkles, ThumbsUp, ThumbsDown, Database, GitBranch } from 'lucide-react';

interface SceneProps {
    mode: 'explore' | 'loop';
}

const StreamingMessage = ({ content, citations, onComplete }: any) => {
    const [displayedText, setDisplayedText] = useState('');
    
    useEffect(() => {
        let isMounted = true;
        let i = 0;
        
        const typeChar = () => {
            if (!isMounted) return;
            if (i <= content.length) {
                setDisplayedText(content.slice(0, i));
                i += 3; // type 3 chars at a time for speed
                setTimeout(typeChar, 10);
            } else {
                setDisplayedText(content);
                if (onComplete) onComplete();
            }
        };
        
        typeChar();
        
        return () => { isMounted = false; };
    }, [content]);

    return (
        <div>
            <div className="leading-relaxed whitespace-pre-wrap text-[15px] font-medium" dangerouslySetInnerHTML={{__html: displayedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}}></div>
            
            {/* Show citations only when finished streaming */}
            {displayedText === content && citations && (
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="mt-3 flex flex-wrap gap-2">
                    {citations.map((cite: any) => (
                        <div key={cite.id} className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:border-orionBlue cursor-pointer transition-colors group shadow-sm">
                            <FileText size={14} className="text-orionBlue group-hover:text-orionBlueDeep transition-colors" />
                            <span>{cite.title}</span>
                            <span className="text-slate-400 ml-1">p.{cite.page}</span>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

const Scene5Chat: React.FC<SceneProps> = () => {
    const [messages, setMessages] = useState<any[]>([
        { role: 'assistant', content: 'Halo! Saya adalah AI Knowledge Assistant Bappenas. Ada yang bisa saya bantu terkait dokumen RPJMN, Renstra, atau data IKU hari ini?', isStreaming: true }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTypingIndicator, setIsTypingIndicator] = useState(false);
    const [autoTypePhase, setAutoTypePhase] = useState<'idle' | 'typing'>('idle');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTypingIndicator]);

    // Auto-typing simulation for the user
    useEffect(() => {
        if (autoTypePhase === 'typing') {
            const question = "Apa strategi Penurunan Susut Pangan dalam RPJMN 2025-2029?";
            let i = 0;
            let isMounted = true;
            
            const typeChar = () => {
                if (!isMounted) return;
                if (i <= question.length) {
                    setInputValue(question.slice(0, i));
                    i++;
                    setTimeout(typeChar, 30 + Math.random() * 40); // realistic typing speed
                } else {
                    // Finished typing, wait a beat then send
                    setTimeout(() => {
                        if (isMounted) handleSend(question);
                    }, 500);
                }
            };
            
            // Wait 1.5 seconds before starting to type
            setTimeout(typeChar, 1500);
            
            return () => { isMounted = false; };
        }
    }, [autoTypePhase]);

    const handleSend = (overrideText?: string) => {
        const textToSend = overrideText || inputValue;
        if (!textToSend.trim()) return;
        
        setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
        setInputValue('');
        setIsTypingIndicator(true);
        setAutoTypePhase('idle');

        setTimeout(() => {
            setIsTypingIndicator(false);
            setMessages(prev => [...prev, { ...mockRagChatHistory[1], isStreaming: true }]);
        }, 1500); // initial think delay
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full p-8 max-w-[1400px] mx-auto flex gap-6 pb-28"
        >
            {/* Left Sidebar: Simplified Pipeline */}
            <div className="w-[300px] flex flex-col gap-4">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 flex flex-col items-center">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 w-full text-center">Data Sources Attached</h3>
                    
                    <div className="flex flex-col gap-4 w-full relative">
                        {/* Connecting Line */}
                        <div className="absolute left-1/2 top-4 bottom-8 w-0.5 bg-slate-100 -z-10"></div>
                        
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center gap-2 text-center shadow-sm z-10">
                            <Database size={24} className="text-orionBlue" />
                            <span className="text-[11px] font-bold text-slate-700">12,450 RPJMN/Renstra Docs</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center gap-2 text-center shadow-sm z-10">
                            <Database size={24} className="text-emerald-500" />
                            <span className="text-[11px] font-bold text-slate-700">Satu Data Indonesia API</span>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center gap-2 text-center shadow-md z-10 mt-2">
                            <GitBranch size={24} className="text-orionYellow" />
                            <span className="text-[11px] font-bold text-white">Vector Knowledge Graph</span>
                            <span className="text-[10px] text-slate-400 mt-1">Retrieving chunks for context</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Chat Area */}
            <div className="flex-1 bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden relative">
                {/* Header */}
                <header className="p-6 border-b border-slate-200 bg-slate-50 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orionBlue to-orionTeal flex items-center justify-center shadow-lg shadow-orionBlue/20">
                            <Sparkles className="text-white w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">RAG Knowledge Base</h1>
                            <p className="text-slate-500 font-medium text-sm mt-0.5">Querying 12,450 embedded RPJMN & Renstra documents.</p>
                        </div>
                    </div>
                </header>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-8 bg-white">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-orionBlue text-white shadow-md'}`}>
                                {msg.role === 'user' ? <User size={24} /> : <Bot size={24} />}
                            </div>
                            
                            <div className={`max-w-[75%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`p-5 rounded-2xl ${msg.role === 'user' ? 'bg-orionBlue text-white rounded-tr-sm shadow-md' : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'}`}>
                                    {msg.isStreaming ? (
                                        <StreamingMessage content={msg.content} citations={msg.citations} onComplete={() => {
                                            const newMsgs = [...messages];
                                            newMsgs[idx].isStreaming = false;
                                            setMessages(newMsgs);
                                            
                                            // If this is the initial greeting, start the user's auto-typing
                                            if (idx === 0) {
                                                setAutoTypePhase('typing');
                                            }
                                        }} />
                                    ) : (
                                        <>
                                            <div className="leading-relaxed whitespace-pre-wrap text-[15px] font-medium" dangerouslySetInnerHTML={{__html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}}></div>
                                            {msg.citations && (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {msg.citations.map((cite: any) => (
                                                        <div key={cite.id} className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:border-orionBlue cursor-pointer transition-colors group shadow-sm">
                                                            <FileText size={14} className="text-orionBlue group-hover:text-orionBlueDeep transition-colors" />
                                                            <span>{cite.title}</span>
                                                            <span className="text-slate-400 ml-1">p.{cite.page}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                {msg.role === 'assistant' && !msg.isStreaming && idx > 0 && (
                                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="mt-4 flex items-center gap-2">
                                        <span className="text-[11px] text-slate-400 uppercase tracking-widest font-bold mr-2">Was this helpful?</span>
                                        <button className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 text-slate-400 transition-colors"><ThumbsUp size={16} /></button>
                                        <button className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-400 transition-colors"><ThumbsDown size={16} /></button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    ))}

                    {isTypingIndicator && (
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-orionBlue shadow-md text-white flex items-center justify-center shrink-0">
                                <Bot size={24} />
                            </div>
                            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl rounded-tl-sm flex items-center gap-1.5 h-[60px] shadow-sm">
                                <div className="w-2.5 h-2.5 rounded-full bg-orionBlue animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-orionBlue animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-orionBlue animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-6 bg-slate-50 border-t border-slate-200 shrink-0">
                    <div className="relative">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about Food Loss strategies in RPJMN..."
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-6 pr-16 py-4 text-slate-800 font-medium focus:border-orionBlue focus:ring-1 focus:ring-orionBlue transition-all outline-none resize-none h-[64px] no-scrollbar placeholder:text-slate-400"
                            rows={1}
                        />
                        <button 
                            onClick={handleSend}
                            disabled={!inputValue.trim() || isTypingIndicator}
                            className="absolute right-2.5 top-2.5 bottom-2.5 w-12 rounded-xl bg-orionBlue hover:bg-orionBlueDeep disabled:bg-slate-200 disabled:text-slate-400 text-white flex items-center justify-center transition-colors shadow-sm"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Scene5Chat;
