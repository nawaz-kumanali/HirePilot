import { useRef, useEffect, useState } from 'react';
import { X, Send, Loader, Sparkles, User, Mic, MicOff, Video, VideoOff, Volume2, VolumeX, Award, CheckCircle, TrendingUp, ChevronRight, Timer, Lightbulb } from 'lucide-react';
import './trainingSession.scss';
import { generateAIQuestion, getPerformanceReport, generateRealTimeInsight } from '../../../utility/aiHelpers';
import { getAiStream } from '../../../utility/HandleAi';

import type { TrainingInterview } from '../../../types/interview';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface PerformanceReport {
  communicationScore: number;
  technicalScore: number;
  overallScore: number;
  feedback: string;
  tips: string[];
}

interface TrainingSessionProps {
  session: {
    isActive: boolean;
    interview: TrainingInterview;
    messages: Message[];
    isLoading: boolean;
  };
  onClose: () => void;
  onUpdate: (messages: Message[], isLoading: boolean) => void;
  onFinish?: (report: any) => void;
}

const SESSION_DURATION = 15 * 60; // 15 minutes in seconds

const TrainingSession = ({ session, onClose, onUpdate, onFinish }: TrainingSessionProps) => {
  const [userInput, setUserInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isFinishing, setIsFinishing] = useState(false);
  const [report, setReport] = useState<PerformanceReport | null>(null);

  // Timer State
  const [timeLeft, setTimeLeft] = useState(SESSION_DURATION);
  const isTimerPaused = false; // Placeholder for future pause logic

  // Real-time Insight State
  const [insight, setInsight] = useState<string | null>(null);
  const [isInsightVisible, setIsInsightVisible] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const initializationStarted = useRef(false);
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  // --- Timer Logic ---
  useEffect(() => {
    if (!session.isActive || isTimerPaused || timeLeft <= 0 || report) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [session.isActive, isTimerPaused, timeLeft, report]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // --- Camera Setup ---
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  // --- Speech Recognition (STT) ---
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setUserInput(prev => prev + event.results[i][0].transcript + ' ');
          }
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // --- Text to Speech (TTS) ---
  const speak = (text: string) => {
    if (!isAudioEnabled) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    const cleanText = text.replace(/\*\*|\#\#/g, '');
    utterance.text = cleanText;
    window.speechSynthesis.speak(utterance);
  };

  const showInsight = (text: string) => {
    setInsight(text);
    setIsInsightVisible(true);
    setTimeout(() => setIsInsightVisible(false), 8000);
  };

  const handleSendMessage = async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput || session.isLoading || isLocalLoading) return;

    setIsLocalLoading(true);
    if (isListening) recognitionRef.current?.stop();

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: trimmedInput, timestamp: new Date() };
    const aiMsgId = `ai-${Date.now()}`;
    const placeholderAiMsg: Message = { id: aiMsgId, role: 'ai', content: '', timestamp: new Date() };

    const currentMessages = [...session.messages, userMsg, placeholderAiMsg];
    onUpdate(currentMessages, true);
    setUserInput('');

    // --- Generate Real-time Insight ---
    generateRealTimeInsight(trimmedInput, session.interview.position).then(tip => {
      if (tip) showInsight(tip);
    });

    try {
      let chatHistory = currentMessages.slice(0, -1) // All except new placeholder
        .filter(m => m.id !== 'msg-intro')
        .map(m => ({
          role: m.role === 'ai' ? 'model' as const : 'user' as const,
          parts: [{ text: m.content }]
        }));

      const prompt = `Based on my answer: "${trimmedInput}", ask the next relevant interview question.`;

      const stream = await getAiStream(prompt, chatHistory);
      let accumulatedText = "";
      let lastUpdate = 0;

      for await (const chunk of stream) {
        accumulatedText += chunk.text();
        const now = Date.now();
        if (now - lastUpdate > 100) { // Throttle updates to 10fps
          onUpdate(
            currentMessages.map(m => m.id === aiMsgId ? { ...m, content: accumulatedText } : m),
            true
          );
          lastUpdate = now;
        }
      }

      onUpdate(
        currentMessages.map(m => m.id === aiMsgId ? { ...m, content: accumulatedText } : m),
        false
      );
      setIsLocalLoading(false);
      speak(accumulatedText);

    } catch (error) {
      console.error("Stream Error:", error);
      onUpdate(currentMessages.filter(m => m.id !== aiMsgId), false);
      setIsLocalLoading(false);
    }
  };

  const handleFinishInterview = async () => {
    setIsFinishing(true);
    try {
      const finalReport = await getPerformanceReport(session.messages, session.interview.position);
      setReport(finalReport);

      if (onFinish) {
        onFinish({
          ...finalReport,
          position: session.interview.position,
          company: session.interview.company,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          messages: session.messages
        });
      }
    } catch (error) {
      console.error("Finish Error:", error);
      onClose();
    } finally {
      setIsFinishing(false);
    }
  };

  const initializeSession = async () => {
    if (session.messages.length > 0) return;

    const introText = `Welcome! I'm your AI Interviewer. We are going to practice for the ${session.interview.position} role at ${session.interview.company}. I'll focus on: ${session.interview.topics.join(', ')}.`;

    const intro: Message = {
      id: 'msg-intro',
      role: 'ai',
      content: introText,
      timestamp: new Date(),
    };

    onUpdate([intro], true);
    speak(introText);

    try {
      // Pass the current state to generate the first question
      const question = await generateAIQuestion({ interview: session.interview, messages: [intro] });
      const firstQuestion: Message = {
        id: `msg-${Date.now()}`,
        role: 'ai',
        content: question,
        timestamp: new Date(),
      };
      onUpdate([intro, firstQuestion], false);
      setTimeout(() => speak(question), 1000);
    } catch (error) {
      onUpdate([intro], false);
    }
  };

  useEffect(() => {
    if (session.isActive && session.messages.length === 0 && !initializationStarted.current) {
      initializationStarted.current = true;
      initializeSession();
    }
  }, [session.isActive, session.messages.length]);

  const toggleMute = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(track => track.enabled = !track.enabled);
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach(track => track.enabled = !track.enabled);
      setIsVideoOff(!isVideoOff);
    }
  };

  if (report) {
    return (
      <div className="interview-video-wrapper">
        <div className="performance-report-overlay">
          <div className="report-card">
            <header className="report-header">
              <Award className="award-icon" />
              <h1>Performance Report</h1>
              <p>Great job! You navigated a high-fidelity simulation for <strong>{session.interview.position}</strong>.</p>
            </header>

            <div className="score-grid">
              <div className="score-item">
                <div className="score-circle">
                  <span className="number">{report.overallScore}</span>
                  <span className="label">Overall</span>
                </div>
              </div>
              <div className="score-details">
                <div className="detail">
                  <div className="detail-info">
                    <span>Communication</span>
                    <span>{report.communicationScore}%</span>
                  </div>
                  <div className="progress-bar"><div className="fill" style={{ width: `${report.communicationScore}%` }}></div></div>
                </div>
                <div className="detail">
                  <div className="detail-info">
                    <span>Technical Accuracy</span>
                    <span>{report.technicalScore}%</span>
                  </div>
                  <div className="progress-bar"><div className="fill" style={{ width: `${report.technicalScore}%` }}></div></div>
                </div>
              </div>
            </div>

            <div className="feedback-section">
              <h3><TrendingUp size={18} /> Critical Analysis</h3>
              <p>{report.feedback}</p>
            </div>

            <div className="tips-section">
              <h3><CheckCircle size={18} /> Targeted Improvement Tips</h3>
              <ul>
                {report.tips.map((tip, i) => (
                  <li key={i}><ChevronRight size={14} /> {tip}</li>
                ))}
              </ul>
            </div>

            <button className="done-btn" onClick={onClose}>Finish & Save Session</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="interview-video-wrapper">
      <div className="video-main-container">
        {/* Top Header */}
        <header className="video-header">
          <div className="interview-info">
            <div className="live-pill">
              <span className="dot pulse"></span> LIVE INTERVIEW
            </div>
            <h1>{session.interview.position}</h1>
            <p className="company-name">{session.interview.company}</p>
          </div>

          <div className="timer-display glass-panel">
            <Timer size={18} className={timeLeft < 60 ? 'warning' : ''} />
            <span className={`time ${timeLeft < 60 ? 'warning' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          <div className="header-actions">
            {session.messages.length > 2 && (
              <button className="finish-btn highlight" onClick={handleFinishInterview} disabled={isFinishing}>
                {isFinishing ? <Loader className="spin" size={18} /> : "Finish Now"}
              </button>
            )}
            <button className="exit-btn" onClick={onClose} title="Exit Session">
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Video Area */}
        <div className="video-grid">
          {/* AI Interviewer View */}
          <div className="video-card ai-view">
            <div className={`ai-avatar-container ${isSpeaking ? 'speaking' : ''}`}>
              {session.isLoading && <div className="thinking-pulse"></div>}
              <div className="ai-visual">
                <Sparkles size={80} className={`ai-icon ${isSpeaking ? 'active' : ''}`} />
                <div className="waves">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>
              <div className="ai-label">AI Interviewer</div>
            </div>

            {/* AI Insight Popup */}
            {isInsightVisible && (
              <div className="ai-insight-toast">
                <Lightbulb size={20} className="light-icon" />
                <div className="insight-text">
                  <span className="insight-label">AI HINT</span>
                  <p>{insight}</p>
                </div>
              </div>
            )}

            {/* Subtitles */}
            {session.messages.filter(m => m.role === 'ai').length > 0 && (
              <div className="ai-subtitle-overlay">
                <p>{session.messages.filter(m => m.role === 'ai').slice(-1)[0].content}</p>
              </div>
            )}
          </div>

          {/* User Preview View */}
          <div className="video-card user-view">
            <video ref={videoRef} autoPlay playsInline muted className={isVideoOff ? 'hidden' : ''} />
            {isVideoOff && (
              <div className="camera-off-placeholder">
                <User size={80} />
                <p>Camera Signal Lost</p>
              </div>
            )}
            <div className="user-label">
              <span className="name">You</span>
              {isMuted && <MicOff size={14} className="muted-icon" />}
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <footer className="video-controls-bar">
          <div className="control-group">
            <button className={`control-btn ${isMuted ? 'active' : ''}`} onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
            </button>
            <button className={`control-btn ${isVideoOff ? 'active' : ''}`} onClick={toggleVideo} title={isVideoOff ? "Turn Video On" : "Turn Video Off"}>
              {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
            </button>
            <button className={`control-btn ${!isAudioEnabled ? 'active' : ''}`} onClick={() => setIsAudioEnabled(!isAudioEnabled)} title={isAudioEnabled ? "Mute AI" : "Unmute AI"}>
              {isAudioEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
          </div>

          <div className="input-group">
            <div className="input-wrapper glass-panel">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={isListening ? "Listening to your response..." : "Type your answer or speak..."}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                className={`voice-btn ${isListening ? 'listening' : ''}`}
                onClick={toggleListening}
                title="Voice Input"
              >
                <div className={`mic-ring ${isListening ? 'active' : ''}`}></div>
                <Mic size={18} />
              </button>
            </div>
            <button
              className="send-btn"
              onClick={handleSendMessage}
              disabled={!userInput.trim() || session.isLoading}
            >
              {session.isLoading ? <Loader className="spin" size={22} /> : <Send size={22} />}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TrainingSession;

