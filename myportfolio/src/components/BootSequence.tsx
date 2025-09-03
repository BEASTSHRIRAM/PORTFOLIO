import { useState, useEffect } from 'react';
import natureWallpaper from '@/assets/desktop-wallpaper.jpg';

interface BootSequenceProps {
  onBootComplete: () => void;
}

export const BootSequence = ({ onBootComplete }: BootSequenceProps) => {
  const [stage, setStage] = useState<'logo' | 'progress' | 'welcome' | 'complete'>('logo');

  useEffect(() => {
    const sequence = async () => {
      // Logo stage - 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStage('progress');
      
      // Progress bar - 3 seconds
      await new Promise(resolve => setTimeout(resolve, 3000));
      setStage('welcome');
      
      // Welcome message - 3 seconds
      await new Promise(resolve => setTimeout(resolve, 3000));
      setStage('complete');
      
      // Fade out and complete
      await new Promise(resolve => setTimeout(resolve, 500));
      onBootComplete();
    };

    sequence();
  }, [onBootComplete]);

  if (stage === 'complete') {
    return null;
  }

  return (
    <div
      className="boot-screen"
      style={{
        backgroundImage: `url(${natureWallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="flex flex-col items-center space-y-8">
        {/* Logo */}
        <div className="logo-glow text-6xl font-bold mb-8">
          <span style={{ 
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            SK
          </span>
        </div>

        {/* Progress Bar */}
        {stage !== 'logo' && (
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        )}

        {/* Welcome Message */}
        {stage === 'welcome' && (
          <div className="typing-text text-xl font-medium text-center">
            Welcome to Sriram Kulkarni's Digital Workspace
          </div>
        )}

        {/* System info */}
        {stage !== 'logo' && (
          <div className="text-sm opacity-60 absolute bottom-8">
            Portfolio OS v2.0 • Loading Experience...
          </div>
        )}
      </div>
    </div>
  );
};