import { useState, useCallback, useRef, useEffect } from 'react';

export const useMediaStream = (active: boolean) => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const streamRef = useRef<MediaStream | null>(null);

    const stopStream = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
            setStream(null);
        }
    }, []);

    const startStream = useCallback(async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            streamRef.current = mediaStream;
            setStream(mediaStream);
            setError(null);
            return mediaStream;
        } catch (err: any) {
            console.error("Media Access Error:", err);
            setError(err);
            return null;
        }
    }, []);

    const toggleMute = useCallback(() => {
        if (streamRef.current) {
            const audioTracks = streamRef.current.getAudioTracks();
            audioTracks.forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsMuted(audioTracks.length > 0 ? !audioTracks[0].enabled : false);
        }
    }, []);

    const toggleVideo = useCallback(() => {
        if (streamRef.current) {
            const videoTracks = streamRef.current.getVideoTracks();
            videoTracks.forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsVideoOff(videoTracks.length > 0 ? !videoTracks[0].enabled : false);
        }
    }, []);

    useEffect(() => {
        const handleStream = async () => {
            if (active) {
                await startStream();
            } else {
                stopStream();
            }
        };
        handleStream();
        return () => {
            stopStream();
        };
    }, [active, startStream, stopStream]);

    return {
        stream,
        error,
        isMuted,
        isVideoOff,
        toggleMute,
        toggleVideo,
        startStream,
        stopStream
    };
};
