import { useState, useCallback, useRef, useEffect } from 'react';

interface UseSpeechOptions {
    rate?: number;
    pitch?: number;
    enabled?: boolean;
}

export const useSpeech = (options: UseSpeechOptions = {}) => {
    const { rate = 1.0, pitch = 1.0, enabled = true } = options;
    const [isSpeaking, setIsSpeaking] = useState(false);
    const synth = window.speechSynthesis;
    const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);

    const stop = useCallback(() => {
        synth.cancel();
        setIsSpeaking(false);
    }, [synth]);

    const speak = useCallback((text: string) => {
        if (!enabled || !text) return;

        // Cancel any previous speech
        stop();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.pitch = pitch;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (event) => {
            console.error('SpeechSynthesis Error:', event);
            setIsSpeaking(false);
        };

        currentUtterance.current = utterance;
        synth.speak(utterance);
    }, [enabled, rate, pitch, stop, synth]);

    useEffect(() => {
        return () => {
            stop();
        };
    }, [stop]);

    return { speak, stop, isSpeaking };
};
