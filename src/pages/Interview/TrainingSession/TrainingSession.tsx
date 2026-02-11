import { useRef, useEffect, useState } from 'react';
import './trainingSession.scss';
import { generateAIQuestion, getPerformanceReport, generateRealTimeInsight } from '../../../utility/aiHelpers';
import { getAiStream } from '../../../utility/HandleAi';

// Hooks
import { useSpeech } from '../../../hooks/useSpeech';
import { useMediaStream } from '../../../hooks/useMediaStream';

// Components
import SessionHeader from './SessionHeader/SessionHeader';
import VideoGrid from './VideoGrid/VideoGrid';
import ControlBar from './ControlBar/ControlBar';
import PerformanceReport from './PerformanceReport/PerformanceReport';
import ErrorOverlay from './ErrorOverlay/ErrorOverlay';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface TrainingSessionProps {
  session: {
    isActive: boolean;
    interview: {
      position: string;
      company: string;
      topics: string[];
    };
    messages: Message[];
  };
  onUpdate: (messages: Message[], isAiThinking: boolean) => void;
  onFinish: (report: any) => void;
  onClose: () => void;
}

const TrainingSession = ({ session, onUpdate, onFinish, onClose }: TrainingSessionProps) => {
  const [userInput, setUserInput] = useState("");
  const [isFinishing, setIsFinishing] = useState(false);
  const [isLocalLoading, setIsLocalLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins
  const [report, setReport] = useState<any>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);

  // Real-time Insight State
  const [insight, setInsight] = useState<string | null>(null);
  const [isInsightVisible, setIsInsightVisible] = useState(false);
  const [systemError, setSystemError] = useState<{ title: string; message: string } | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const initializationStarted = useRef(false);

  // Use Custom Hooks
  const { speak, isSpeaking: isAiSpeaking } = useSpeech({ enabled: isAudioEnabled });
  const {
    isMuted,
    isVideoOff,
    toggleMute,
    toggleVideo,
    stream
  } = useMediaStream(session.isActive);

  // Sync video ref with stream
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    let timer: any;
    if (session.isActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [session.isActive, timeLeft]);

  const handleSendMessage = async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    const userMsg: Message = { id: `user-${Date.now()}`, role: 'user', content: trimmedInput, timestamp: new Date() };
    const currentMessages = [...session.messages, userMsg];

    setUserInput("");
    setIsLocalLoading(true);
    onUpdate(currentMessages, true);

    const aiMsgId = `ai-${Date.now()}`;
    try {
      // 1. Get real-time insight while AI is thinking
      const insightText = await generateRealTimeInsight(trimmedInput, session.interview.position);
      if (insightText) {
        setInsight(insightText);
        setIsInsightVisible(true);
        setTimeout(() => setIsInsightVisible(false), 5000);
      }

      // 2. Start Message Stream
      const chatHistory = session.messages.map(m => ({
        role: m.role === 'ai' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const stream = await getAiStream(trimmedInput, chatHistory);
      let accumulatedText = "";

      onUpdate([...currentMessages, { id: aiMsgId, role: 'ai', content: "", timestamp: new Date() }], true);

      let lastUpdateTime = Date.now();
      const UPDATE_INTERVAL = 100;

      for await (const chunk of stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;

        const now = Date.now();
        if (now - lastUpdateTime > UPDATE_INTERVAL) {
          onUpdate(
            currentMessages.map(m => m.id === aiMsgId ? { ...m, content: accumulatedText } : m),
            true
          );
          lastUpdateTime = now;
        }
      }

      onUpdate(
        currentMessages.map(m => m.id === aiMsgId ? { ...m, content: accumulatedText } : m),
        false
      );
      setIsLocalLoading(false);
      speak(accumulatedText);

    } catch (error: any) {
      console.error("Stream Error:", error);
      setSystemError({
        title: "AI Connection Issue",
        message: error.message || "We're having trouble connecting to the AI. This usually happens due to rate limits or temporary service interruptions. Please try again in 1 minute."
      });
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
    } catch (error: any) {
      console.error("Finish Error:", error);
      onClose();
    } finally {
      setIsFinishing(false);
    }
  };

  const initializeSession = async () => {
    if (session.messages.length > 0) return;

    const introText = `Welcome! I'm your AI Interviewer. We are going to practice for the ${session.interview.position} role at ${session.interview.company}. I'll focus on: ${session.interview.topics.join(', ')}.`;
    const intro: Message = { id: 'intro', role: 'ai', content: introText, timestamp: new Date() };

    try {
      speak(introText);
      const question = await generateAIQuestion(session);
      const firstQuestion: Message = {
        id: `msg-${Date.now()}`,
        role: 'ai',
        content: question,
        timestamp: new Date(),
      };
      onUpdate([intro, firstQuestion], false);
      setTimeout(() => speak(question), 1000);
    } catch (error: any) {
      console.error("Initialization error:", error);
      setSystemError({
        title: "Simulation Error",
        message: "Failed to initialize the AI interviewer. This might be a temporary connectivity issue. Please try again later."
      });
    }
  };

  useEffect(() => {
    if (session.isActive && session.messages.length === 0 && !initializationStarted.current) {
      initializationStarted.current = true;
      initializeSession();
    }
  }, [session.isActive, session.messages.length]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!session.isActive) return null;

  return (
    <div className="interview-video-wrapper">
      <div className="video-main-container">

        <SessionHeader
          position={session.interview.position}
          company={session.interview.company}
          timeLeft={timeLeft}
          formatTime={formatTime}
          onFinish={handleFinishInterview}
          onClose={onClose}
          isFinishing={isFinishing}
          canFinish={session.messages.length > 0}
        />

        <VideoGrid
          isSpeaking={isAiSpeaking}
          isLoading={isLocalLoading}
          isInsightVisible={isInsightVisible}
          insight={insight}
          lastAiMessage={session.messages.filter(m => m.role === 'ai').pop()?.content}
          videoRef={videoRef}
          isVideoOff={isVideoOff}
          isMuted={isMuted}
        />

        <ControlBar
          isMuted={isMuted}
          isVideoOff={isVideoOff}
          isAudioEnabled={isAudioEnabled}
          onToggleMute={toggleMute}
          onToggleVideo={toggleVideo}
          onToggleAudio={() => setIsAudioEnabled(!isAudioEnabled)}
          isListening={isListening}
          onToggleListening={() => setIsListening(!isListening)}
          userInput={userInput}
          setUserInput={setUserInput}
          onSendMessage={handleSendMessage}
          isLoading={isLocalLoading}
        />
      </div>

      <PerformanceReport
        report={report}
        position={session.interview.position}
        onClose={onClose}
      />

      {systemError && (
        <ErrorOverlay
          error={systemError}
          onRetry={() => setSystemError(null)}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default TrainingSession;
