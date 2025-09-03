import { useState, useEffect } from 'react';

// SVGs for Wi-Fi, Search, Control Center (simple, can be replaced with icon libs)
const WifiIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-white opacity-80"><path d="M2.05 7.05a16 16 0 0 1 19.9 0M5.5 10.5a11 11 0 0 1 13 0M9 14a6 6 0 0 1 6 0M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const SearchIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-white opacity-80"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
);
const ControlCenterIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-white opacity-80"><rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2"/></svg>
);

export function MenuBar() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Format time and date like mobile (e.g., 4:38 PM, Wed, Sep 3, 2025)
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const dateString = now.toLocaleDateString([], { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-9 z-50 flex items-center px-4 md:px-8 bg-black/60 backdrop-blur-md border-b border-white/10 select-none">
        {/* Apple logo */}
        <button
          className="mr-3 flex items-center justify-center w-8 h-8 rounded hover:bg-white/10 transition"
          aria-label="About This Portfolio"
          onClick={() => setAboutOpen(true)}
        >
          <svg width="16" height="20" viewBox="0 0 170 170" className="text-white fill-current">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929 0.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002 0.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-0.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375-0.119-0.972-0.188-1.995-0.188-3.07 0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.252 8.99-3.497 13.1-3.71 0.12 1.083 0.17 2.17 0.17 3.24z"/>
          </svg>
        </button>
        {/* App/Portfolio Name */}
        <span className="text-white font-semibold text-sm tracking-wide mr-6">Sriram Kulkarni</span>
        {/* Spacer */}
        <div className="flex-1" />
        {/* Status Icons */}
        <div className="flex items-center gap-1">
          <WifiIcon />
          <SearchIcon />
          <ControlCenterIcon />
          <div className="flex flex-col text-xs text-blue-300 font-mono leading-tight">
            <span className="text-right">{timeString}</span>
            <span className="text-[10px] text-blue-200 text-right">{dateString}</span>
          </div>
        </div>
      </div>
      {/* About Modal */}
      {aboutOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-xl shadow-xl p-8 max-w-xs w-full text-center relative text-white">
            <button
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg"
              onClick={() => setAboutOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="mb-4">
              <svg width="48" height="56" viewBox="0 0 170 170" className="text-white fill-current mx-auto">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929 0.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002 0.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-0.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375-0.119-0.972-0.188-1.995-0.188-3.07 0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.252 8.99-3.497 13.1-3.71 0.12 1.083 0.17 2.17 0.17 3.24z"/>
              </svg>
            </div>
            <h2 className="font-bold text-lg mb-2">About This Portfolio</h2>
            <p className="text-white/90 text-sm mb-4">Portfolio of Sriram Kulkarni<br/>Full Stack Developer & AI Enthusiast</p>
            <p className="text-xs text-white/60 pt-2 border-t border-white/10">Inspired by macOS UI</p>
          </div>
        </div>
      )}
    </>
  );
}
