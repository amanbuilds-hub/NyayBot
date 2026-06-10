import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:5001/api/chat', {
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
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-white z-10 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-navy">LegalBot</h2>
          <p className="text-sm text-text-secondary">Your Legal Assistant | Free Legal Help</p>
        </div>
        <div className="bg-saffron-light text-navy text-xs font-bold px-3 py-1 rounded-full border border-saffron">
          NALSA: 15100
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4 md:p-6 pb-32">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold mr-2 shrink-0">
                  N
                </div>
              )}
              <div
                className={`p-3 md:p-4 text-[15px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-navy text-white rounded-[18px_18px_4px_18px] max-w-[70%]' 
                    : 'bg-white text-text-primary border border-navy rounded-[18px_18px_18px_4px] max-w-[75%]'
                }`}
              >
                {msg.content}
                <div className={`text-[10px] mt-2 text-right ${msg.role === 'user' ? 'text-gray-300' : 'text-gray-400'}`}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
               <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold mr-2 shrink-0">
                  N
                </div>
              <div className="bg-white border border-navy rounded-[18px_18px_18px_4px] p-4 flex items-center gap-1 shadow-sm">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-border p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto">
          {messages.length === 1 && (
            <div className="flex overflow-x-auto gap-2 pb-3 mb-2 scrollbar-hide">
              {suggestions.map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSend(s)}
                  className="whitespace-nowrap px-4 py-2 bg-gray-100 hover:bg-gray-200 text-text-primary text-sm rounded-full transition-colors border border-gray-200"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }} 
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-grow border border-navy rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-navy/20 shadow-sm text-sm md:text-base"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-11 h-11 rounded-full bg-saffron text-white flex items-center justify-center hover:bg-orange-500 transition-colors shadow-md disabled:opacity-50 shrink-0"
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
