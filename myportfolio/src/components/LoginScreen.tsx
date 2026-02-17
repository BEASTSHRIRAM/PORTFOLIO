import { useState, useRef, useEffect } from 'react';
import desktopWallpaper from '@/assets/desktop-wallpaper.jpg';

interface LoginScreenProps {
  onLogin: () => void;
  userName?: string;
  userPhoto?: string;
  wallpaper?: string;
}

export const LoginScreen = ({ 
  onLogin, 
  userName = 'Sriram Kulkarni',
  userPhoto = '/yo.jpeg',
  wallpaper = desktopWallpaper
}: LoginScreenProps) => {
  const [password, setPassword] = useState('');
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger boot when form is submitted (go button or enter key)
    onLogin();
  };

  const handleClickToEnter = () => {
    // Trigger boot when "Click to enter" is clicked
    onLogin();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Login card */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Profile photo */}
        <div 
          className={`w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 mb-6 ${shake ? 'animate-shake' : ''}`}
        >
          <img 
            src={userPhoto} 
            alt={userName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* User name */}
        <h2 className="text-white text-2xl font-medium mb-6">
          {userName}
        </h2>

        {/* Password input form */}
        <form onSubmit={handleSubmit} className="w-64">
          <div className={`relative ${shake ? 'animate-shake' : ''}`}>
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
          <button
            type="button"
            onClick={handleClickToEnter}
            className="text-white/60 hover:text-white text-xs mt-3 text-center w-full transition-colors cursor-pointer"
          >
            Click to enter
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};
