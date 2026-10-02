import React, { useState, useEffect, useRef } from 'react';
import {
  HeartPulse,
  Send,
  Bot,
  User,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { ChatMessage, ScreeningResult, Language } from '../types';
import { generateKuraiClinicalResponse } from '../utils/clinicalAdvisor';

interface KuraiAIAssistantProps {
  initialScreeningContext?: ScreeningResult | null;
  language: Language;
}

export const KuraiAIAssistant: React.FC<KuraiAIAssistantProps> = ({
  initialScreeningContext,
  language,
}) => {
  const isTa = language === 'ta';
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let welcomeText = isTa
      ? 'வணக்கம், நான் குரல் AI (Kurai AI), உங்கள் நீரிழிவு பாதப் பாதுகாப்பு மற்றும் நலன் சார்ந்த வழிகாட்டி. பாதப் பரிசோதனை முறைகள், தகுதியான காலணிகள், உணவு முறை அல்லது எப்போது மருத்துவரை அணுக வேண்டும் என்பது குறித்து என்னிடம் கேட்கலாம்.'
      : 'Hello, I am Kurai AI, your diabetic foot care and limb wellness companion. I can answer questions about daily inspection techniques, diabetic footwear, callus care, nutrition, or when to contact a podiatrist.';

    if (initialScreeningContext) {
      if (initialScreeningContext.prediction === 'abnormal') {
        welcomeText = isTa
          ? `வணக்கம், உங்கள் சமீபத்திய ஆரம்பநிலை பரிசோதனையில் பாதத்தில் புண் போன்ற தோற்றம் கண்டறியப்பட்டுள்ளது. காலில் அதிக எடை கொடுக்காமல் உடனடியாக தகுதியான மருத்துவரை அணுகுவது மிக முக்கியம். அடுத்தகட்ட நடவடிக்கைகள் அல்லது தமிழ்நாடு சிறப்பு மருத்துவமனைகள் பற்றி என்னிடம் கேட்கலாம்.`
          : `Hello, I see that your recent preliminary screening detected an abnormal wound/ulcer-like visual pattern. I strongly recommend scheduling an evaluation with a podiatrist or wound care center right away. How can I help you understand next steps or clinical centers in Tamil Nadu?`;
      } else if (initialScreeningContext.prediction === 'normal') {
        welcomeText = isTa
          ? `வணக்கம், உங்கள் சமீபத்திய பரிசோதனையில் பாதம் இயல்பாகத் தென்படுகிறது. புண்கள் எதுவும் இல்லை. தினசரி தொடர்ந்து பாதங்களைப் பராமரிப்பது அவசியம். காலணிகள் தேர்வு, சாக்ஸ் அல்லது அன்றாடப் பராமரிப்பு பற்றி ஏதேனும் கேட்க விரும்புகிறீர்களா?`
          : `Hello, I see your recent screening showed a normal-looking foot appearance with no obvious visible wounds. Daily proactive care is the key to preventing future complications. What questions do you have about maintaining healthy feet, selecting diabetic socks, or nutrition?`;
      }
    }

    setMessages([
      {
        id: 'msg-welcome',
        sender: 'kurai',
        text: welcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [initialScreeningContext, isTa]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ask-kurai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          language,
          context: initialScreeningContext
            ? {
                result: initialScreeningContext.prediction,
                observations: initialScreeningContext.observations,
              }
            : null,
        }),
      });

      let replyText = '';
      if (response.ok) {
        const data = await response.json();
        replyText = data.reply;
      }

      if (!replyText || !replyText.trim()) {
        replyText = generateKuraiClinicalResponse(
          query,
          initialScreeningContext
            ? {
                result: initialScreeningContext.prediction,
                observations: initialScreeningContext.observations,
              }
            : null
        );
      }

      const kuraiReply: ChatMessage = {
        id: `msg-kurai-${Date.now()}`,
        sender: 'kurai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, kuraiReply]);
    } catch {
      const fallbackReply = generateKuraiClinicalResponse(
        query,
        initialScreeningContext
          ? {
              result: initialScreeningContext.prediction,
              observations: initialScreeningContext.observations,
            }
          : null
      );
      const errorMessage: ChatMessage = {
        id: `msg-kurai-${Date.now()}`,
        sender: 'kurai',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQuestions = isTa
    ? [
        'பாதங்களில் உணர்ச்சி குறைவது ஏன்?',
        'தினமும் பாதத்தை எவ்வாறு பரிசோதிக்க வேண்டும்?',
        'நீரிழிவு உள்ளவர்கள் வெறும் கால்களுடன் நடக்கக் கூடாதா?',
        'புண்கள் விரைவில் ஆற என்னென்ன உணவுகள் சாப்பிட வேண்டும்?',
      ]
    : [
        'What should I do if my foot feels numb or tingling?',
        'How do I safely inspect the bottom of my feet every day?',
        'Why is it dangerous to walk barefoot with diabetes?',
        'Which Indian foods help accelerate foot ulcer healing?',
      ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white border-2 border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-700/25 shrink-0">
            <HeartPulse className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {isTa ? 'குரல் AI – பாத நல வழிகாட்டி' : 'Ask Kurai AI'}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                {isTa ? 'ஆலோசகர்' : 'Clinical Companion'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {isTa
                ? 'நீரிழிவு பாத ஆரோக்கியம், உணவு முறைகள் மற்றும் பாதுகாப்பு ஆலோசனைகள்.'
                : 'Empathetic, evidence-based guidance for diabetic foot wellness and hygiene.'}
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-600 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600 inline mr-1" />
          <span>IWGDF 2023 & ADA Guidelines</span>
        </div>
      </div>

      {/* Chat Window */}
      <div className="bg-white border border-emerald-100 rounded-3xl shadow-sm overflow-hidden flex flex-col h-[520px]">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isUser ? 'bg-slate-800 text-white' : 'bg-emerald-600 text-white shadow-xs'
                  }`}
                >
                  {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`block text-[10px] mt-1.5 ${
                      isUser ? 'text-emerald-100 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none p-4 text-xs text-slate-500 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce delay-300"></div>
                <span className="font-semibold text-emerald-800 ml-1">
                  {isTa ? 'குரல் AI யோசிக்கிறது...' : 'Kurai AI is thinking...'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggested Queries */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
          <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="text-[11px] font-bold text-slate-500 shrink-0">
            {isTa ? 'கேள்விகள்:' : 'Try asking:'}
          </span>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-[11px] text-slate-700 bg-white hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 px-3 py-1 rounded-full shrink-0 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <div className="p-4 bg-white border-t border-emerald-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={
                isTa
                  ? 'பாதப் பராமரிப்பு, காலணிகள் அல்லது உணவு பற்றி குரல் AI-யிடம் கேட்கவும்...'
                  : 'Ask Kurai AI about foot care, shoes, diet, or warning signs...'
              }
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-emerald-700/20 flex items-center gap-1.5 transition-all focus:outline-hidden"
            >
              <span>{isTa ? 'கேட்க' : 'Ask'}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="text-center text-xs text-slate-500">
        {isTa
          ? 'இந்தத் தகவல்கள் பொதுவான விழிப்புணர்வுக்காக மட்டுமே வழங்கப்படுகின்றன. மருத்துவ நோயறிதல் மற்றும் சிகிச்சைக்காக எப்போதும் தகுதியான மருத்துவரை அணுகவும்.'
          : 'This information is for general education. Please consult a qualified healthcare professional for diagnosis and treatment. In emergencies, call 108 or 112.'}
      </div>
    </div>
  );
};
