import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hello! I am NyayBot. I can provide you with information regarding bail, lawyers, and your legal rights. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const suggestions = [
    "How to get bail?",
    "I need a free lawyer",
    "What are my rights?",
    "What is UTRC?",
    "What to do during an arrest?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text };
    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/chat`, {
        message: text,
        language: 'english',
        history: messages.map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.content }))
      });
      
      setMessages([...newHistory, { role: 'bot', content: response.data.reply }]);
    } catch (error) {
      setMessages([...newHistory, { role: 'bot', content: "No response from server. Please call NALSA helpline at 15100." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 relative">
      <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-800 sticky top-0 bg-slate-950/95 backdrop-blur-sm z-10 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-navy">LegalBot</h2>
          <p className="text-sm text-text-secondary">Your Legal Assistant | Free Legal Help</p>
        </div>
        <div className="bg-saffron-light text-navy text-xs font-bold px-3 py-1 rounded-full border border-saffron">
          NALSA: 15100
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-44">
        <div className="max-w-3xl mx-auto flex flex-col gap-5 bg-slate-900 rounded-[32px] p-4 md:p-6 shadow-[0_20px_50px_rgba(15,23,42,0.35)] border border-slate-800">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold mr-3 shrink-0">
                  N
                </div>
              )}
              <div
                className={`p-4 md:p-5 text-[15px] leading-relaxed shadow-[0_2px_15px_rgba(15,23,42,0.08)] break-words whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-navy text-white rounded-[18px_18px_4px_18px] max-w-[75%] border border-slate-800'
                    : 'bg-slate-950 text-slate-100 rounded-[18px_18px_18px_4px] max-w-[80%] border border-slate-800'
                }`}
              >
                {msg.content}
                <div className={`text-[10px] mt-3 text-right ${msg.role === 'user' ? 'text-slate-300' : 'text-slate-400'}`}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold mr-3 shrink-0">
                N
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-[18px_18px_18px_4px] p-4 flex items-center gap-2 shadow-[0_2px_15px_rgba(15,23,42,0.08)]">
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.12)]">
        <div className="max-w-3xl mx-auto">
          {messages.length === 1 && (
            <div className="flex overflow-x-auto gap-2 pb-3 mb-2 scrollbar-hide">
              {suggestions.map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSend(s)}
                  className="whitespace-nowrap px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm rounded-full transition-colors border border-slate-700"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }} 
            className="flex flex-col gap-3 md:flex-row items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="w-full flex-grow border border-slate-700 bg-slate-950 text-slate-100 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-saffron shadow-sm text-sm md:text-base"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-full md:w-14 h-12 md:h-12 rounded-full bg-saffron text-white flex items-center justify-center hover:bg-orange-500 transition-colors shadow-md disabled:opacity-50"
            >
              <span className="text-xl leading-none">➔</span>
            </button>
          </form>
          <div className="text-center mt-3 text-[11px] text-gray-500">
            AI-generated info | For legal advice call NALSA: 15100
          </div>
        </div>
      </div>
    </div>
  );
}
