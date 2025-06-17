'use client';

import { useEffect, useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<{ userText: string; aiText: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleInput = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(input);
      const aiText = result.response.text();

      setChat((prev) => [...prev, { userText: input, aiText }]);
      speakText(aiText);
      setInput("");
    } catch (err) {
      console.error("Gemini API error:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => setChat([]);

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-black text-white" : "bg-white text-gray-900"} flex flex-col items-center transition-colors`}>
      <div className="w-full max-w-3xl px-4">
        <div className="flex justify-between items-center mt-6 mb-4">
          <h1 className="text-3xl font-bold">🤖 ChatBot</h1>
          <button onClick={() => setDarkMode(!darkMode)} className="px-3 py-1 rounded bg-rose-400 cursor-pointer dark:bg-gray-700 text-black dark:text-white hover:opacity-80">
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chat.map((entry, index) => (
            <div key={index} className="mb-4">
              <div className="bg-stone-500 text-white rounded-xl p-3 text-right">
                <p>{entry.userText}</p>
              </div>
              <div className={`rounded-xl p-3 mt-2 ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}`}>
                <p>{entry.aiText}</p>
              </div>
            </div>
          ))}
          {loading && <p className="text-sm text-gray-500">Bot is typing...</p>}
          <div ref={chatEndRef} />
        </div>
      </div>

      <div className={`fixed bottom-0 left-1/2 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] transform -translate-x-1/2 w-full max-w-3xl  dark:bg-black border-t border-gray-300 dark:border-gray-700 p-4 flex flex-col sm:flex-row gap-3 z-50`}>
        <input type="text" className={`flex-1 rounded-full px-4 py-3 border focus:outline-none ${ darkMode
              ? "border-gray-700 bg-gray-900 text-white"
              : "border-gray-300 text-black"}`}
          value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..."/>

        <div className="flex gap-2">
          <button onClick={handleInput} disabled={loading} className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"> Send </button>
         
          <button onClick={clearChat} className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition"> Clear </button>
         
          <button onClick={handleVoiceInput} className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition">🎙️ Speak </button>
        </div>
      </div>
    </div>
  );
}
