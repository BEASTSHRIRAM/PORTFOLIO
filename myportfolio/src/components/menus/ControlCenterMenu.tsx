import React, { useRef, useState, useEffect } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useStore } from "../../store";

interface ControlCenterMenuProps {
  toggleControlCenter: () => void;
  btnRef: React.RefObject<HTMLDivElement>;
}

const SliderComponent = ({ 
  icon, 
  value, 
  setValue 
}: { 
  icon: React.ReactNode; 
  value: number; 
  setValue: (v: number) => void;
}) => (
  <div className="flex items-center gap-2">
    <div className="w-7 h-7 flex items-center justify-center bg-white/10 rounded-full">
      {icon}
    </div>
    <input
      type="range"
      min={1}
      max={100}
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
    />
  </div>
);

export default function ControlCenterMenu({ toggleControlCenter, btnRef }: ControlCenterMenuProps) {
  const controlCenterRef = useRef<HTMLDivElement>(null);
  
  const isPlaying = useStore((state) => state.isPlaying);
  const currentTime = useStore((state) => state.currentTime);
  const duration = useStore((state) => state.duration);
  const audioElement = useStore((state) => state.audioElement);
  const setIsPlaying = useStore((state) => state.setIsPlaying);
  const setCurrentTime = useStore((state) => state.setCurrentTime);
  const setDuration = useStore((state) => state.setDuration);
  const setAudioElement = useStore((state) => state.setAudioElement);
  
  const wifi = useStore((state) => state.wifi);
  const bluetooth = useStore((state) => state.bluetooth);
  const airdrop = useStore((state) => state.airdrop);
  const dark = useStore((state) => state.dark);
  const fullscreen = useStore((state) => state.fullscreen);
  const brightness = useStore((state) => state.brightness);
  const volume = useStore((state) => state.volume);
  
  const toggleWifi = useStore((state) => state.toggleWifi);
  const toggleBluetooth = useStore((state) => state.toggleBluetooth);
  const toggleAirdrop = useStore((state) => state.toggleAirdrop);
  const toggleDark = useStore((state) => state.toggleDark);
  const toggleFullscreen = useStore((state) => state.toggleFullscreen);
  const setBrightness = useStore((state) => state.setBrightness);
  const setVolume = useStore((state) => state.setVolume);

  useClickOutside(controlCenterRef, toggleControlCenter, [btnRef as React.RefObject<HTMLElement>]);

  // Initialize audio element if not already done
  useEffect(() => {
    if (!audioElement) {
      const audio = new Audio('/music.mp3');
      audio.preload = 'metadata';
      setAudioElement(audio);
    }
  }, [audioElement, setAudioElement]);

  // Audio controls
  useEffect(() => {
    if (audioElement) {
      audioElement.volume = volume / 100;
    }
  }, [volume, audioElement]);

  useEffect(() => {
    if (!audioElement) return;

    const updateTime = () => setCurrentTime(audioElement.currentTime);
    const updateDuration = () => setDuration(audioElement.duration);
    const handleEnded = () => setIsPlaying(false);

    audioElement.addEventListener('timeupdate', updateTime);
    audioElement.addEventListener('loadedmetadata', updateDuration);
    audioElement.addEventListener('ended', handleEnded);

    return () => {
      audioElement.removeEventListener('timeupdate', updateTime);
      audioElement.removeEventListener('loadedmetadata', updateDuration);
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [audioElement, setCurrentTime, setDuration, setIsPlaying]);

  const togglePlay = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    toggleFullscreen();
  };

  return (
    <div
      className="fixed top-9 right-2 w-80 bg-black/70 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-xl text-white text-sm z-[60] p-2.5"
      ref={controlCenterRef}
      style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gridTemplateRows: 'repeat(5, auto)', 
        gap: '0.5rem' 
      }}
    >
      {/* WiFi, Bluetooth, AirDrop section */}
      <div className="col-span-2 row-span-2 bg-white/10 rounded-xl p-3 flex flex-col justify-around">
        <div className="flex items-center gap-2">
          <button 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${wifi ? 'bg-blue-500' : 'bg-white/20'}`}
            onClick={toggleWifi}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path d="M2.05 7.05a16 16 0 0 1 19.9 0M5.5 10.5a11 11 0 0 1 13 0M9 14a6 6 0 0 1 6 0M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div>
            <div className="font-medium text-xs">Wi-Fi</div>
            <div className="text-[10px] text-white/60">{wifi ? 'Home' : 'Off'}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${bluetooth ? 'bg-blue-500' : 'bg-white/20'}`}
            onClick={toggleBluetooth}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"/>
            </svg>
          </button>
          <div>
            <div className="font-medium text-xs">Bluetooth</div>
            <div className="text-[10px] text-white/60">{bluetooth ? 'On' : 'Off'}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${airdrop ? 'bg-blue-500' : 'bg-white/20'}`}
            onClick={toggleAirdrop}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </button>
          <div>
            <div className="font-medium text-xs">AirDrop</div>
            <div className="text-[10px] text-white/60">{airdrop ? 'Contacts Only' : 'Off'}</div>
          </div>
        </div>
      </div>

      {/* Dark Mode */}
      <div className="col-span-2 bg-white/10 rounded-xl p-3 flex items-center gap-3">
        <button 
          className={`w-8 h-8 rounded-full flex items-center justify-center ${dark ? 'bg-blue-500' : 'bg-white/20'}`}
          onClick={toggleDark}
        >
          {dark ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
            </svg>
          )}
        </button>
        <span className="font-medium text-xs">{dark ? 'Dark Mode' : 'Light Mode'}</span>
      </div>

      {/* Keyboard Brightness */}
      <div className="bg-white/10 rounded-xl p-2 flex flex-col items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mb-1">
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
        <span className="text-[9px] text-center leading-tight">Keyboard Brightness</span>
      </div>

      {/* Fullscreen */}
      <div 
        className="bg-white/10 rounded-xl p-2 flex flex-col items-center justify-center cursor-pointer hover:bg-white/20"
        onClick={handleFullscreen}
      >
        {fullscreen ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mb-1">
            <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mb-1">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
          </svg>
        )}
        <span className="text-[9px] text-center leading-tight">
          {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        </span>
      </div>

      {/* Display brightness */}
      <div className="col-span-4 bg-white/10 rounded-xl p-3">
        <span className="font-medium text-xs mb-2 block">Display</span>
        <SliderComponent
          icon={
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/>
            </svg>
          }
          value={brightness}
          setValue={setBrightness}
        />
      </div>

      {/* Sound */}
      <div className="col-span-4 bg-white/10 rounded-xl p-3">
        <span className="font-medium text-xs mb-2 block">Sound</span>
        <SliderComponent
          icon={
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          }
          value={volume}
          setValue={setVolume}
        />
      </div>

      {/* Now Playing */}
      <div className="col-span-4 bg-white/10 rounded-xl p-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center overflow-hidden">
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-6">
                <div className="w-1 bg-white rounded-full animate-bounce" style={{ height: '60%', animationDelay: '0ms' }}></div>
                <div className="w-1 bg-white rounded-full animate-bounce" style={{ height: '100%', animationDelay: '150ms' }}></div>
                <div className="w-1 bg-white rounded-full animate-bounce" style={{ height: '40%', animationDelay: '300ms' }}></div>
                <div className="w-1 bg-white rounded-full animate-bounce" style={{ height: '80%', animationDelay: '450ms' }}></div>
              </div>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-xs truncate">{isPlaying ? 'Now Playing' : 'Music'}</div>
            <div className="text-[10px] text-white/60">
              {duration > 0 ? `${formatTime(currentTime)} / ${formatTime(duration)}` : 'Tap to play'}
            </div>
            {/* Progress bar */}
            {duration > 0 && (
              <div className="w-full h-1 bg-white/20 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="h-full bg-white/80 rounded-full transition-all"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
            )}
          </div>
          <button 
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
