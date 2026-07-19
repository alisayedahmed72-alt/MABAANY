import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface ScrollVideoPlayerProps {
  src: string;
  className?: string;
  fallbackImage?: string;
  videoScale?: number;
  videoBlur?: number;
  overlayOpacity?: number;
}

export const ScrollVideoPlayer: React.FC<ScrollVideoPlayerProps> = ({
  src,
  className = '',
  fallbackImage,
  videoScale,
  videoBlur = 0,
  overlayOpacity = 0.1
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    setIsVideoReady(false);
    setError(false);

    // Modern browsers require video to be muted programmatically to ensure autoplay success
    video.defaultMuted = true;
    video.muted = true;

    let hls: Hls | null = null;
    const isHls = src.toLowerCase().includes('.m3u8');

    if (isHls) {
      if (Hls.isSupported()) {
        hls = new Hls({
          maxBufferLength: 30,
          startPosition: 0,
          autoStartLoad: true
        });

        hls.loadSource(src);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.defaultMuted = true;
          video.muted = true;
          video.play().catch(() => {});
          setIsVideoReady(true);
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            console.warn('HLS error, falling back to static image:', data);
            setError(true);
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        video.load();
      } else {
        setError(true);
      }
    } else {
      // Standard MP4 stream
      video.src = src;
      video.load();
    }

    const handleVideoReady = () => {
      setIsVideoReady(true);
      video.defaultMuted = true;
      video.muted = true;
      video.play().catch((err) => {
        console.log("Autoplay blocked or interrupted:", err);
      });
    };

    const handleVideoError = () => {
      console.warn('Video element error, falling back to static image');
      setError(true);
    };

    // If already loaded/ready
    if (video.readyState >= 2) {
      handleVideoReady();
    }

    // Attach multiple listeners to catch any readiness signal the browser fires
    video.addEventListener('canplay', handleVideoReady);
    video.addEventListener('loadeddata', handleVideoReady);
    video.addEventListener('playing', handleVideoReady);
    video.addEventListener('error', handleVideoError);

    // Trigger initial play request
    video.play().catch(() => {});

    return () => {
      video.removeEventListener('canplay', handleVideoReady);
      video.removeEventListener('loadeddata', handleVideoReady);
      video.removeEventListener('playing', handleVideoReady);
      video.removeEventListener('error', handleVideoError);
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <div className={`absolute inset-0 w-full min-w-full h-full min-h-full overflow-hidden ${className}`}>
      {/* 1. Base Layer: Fallback Static Image (Always visible first, never blocks) - Shifted right */}
      {fallbackImage && (
        <div
          className="absolute inset-0 w-full min-w-full h-full min-h-full bg-cover pointer-events-none transition-all duration-300"
          style={{ 
            backgroundImage: `url(${fallbackImage})`,
            backgroundPosition: '35% 50%',
            filter: videoBlur > 0 ? `blur(${videoBlur}px)` : 'none',
            transform: videoScale 
              ? `scale(${videoScale * (videoBlur > 0 ? (1 + (videoBlur / 150)) : 1.05)})` 
              : `scale(${videoBlur > 0 ? (1 + (videoBlur / 150)) : 1.05})`
          }}
        />
      )}

      {/* 2. Top Layer: Video Stream (Smoothly fades in once ready) - Shifted right */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full min-w-full h-full min-h-full object-cover transition-opacity duration-1000 ease-in-out pointer-events-none ${
          isVideoReady && !error ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          objectPosition: '35% 50%',
          objectFit: 'cover',
          transform: videoScale 
            ? `scale(${videoScale * (videoBlur > 0 ? (1 + (videoBlur / 150)) : 1)})` 
            : `scale(${videoBlur > 0 ? (1 + (videoBlur / 150)) : 1})`,
          filter: videoBlur > 0 ? `blur(${videoBlur}px)` : 'none'
        }}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
      />

      {/* 3. Adjustable dim layer on top of the video */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{
          backgroundColor: `rgba(10, 10, 10, ${overlayOpacity})`
        }}
      />
    </div>
  );
};
