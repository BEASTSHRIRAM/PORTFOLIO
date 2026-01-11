import { useState } from 'react';
import { useStore } from '../../store';

interface SafariState {
  goURL: string;
  currentURL: string;
}

interface SiteData {
  id: string;
  title: string;
  img?: string;
  link: string;
  inner?: boolean;
}

const favorites: SiteData[] = [
  { id: 'github', title: 'GitHub', img: '/github.png', link: 'https://github.com/BEASTSHRIRAM' },
  { id: 'linkedin', title: 'LinkedIn', img: '/linkedin.png', link: 'https://linkedin.com/in/sriramkulkarni7878' },
  { id: 'leetcode', title: 'LeetCode', img: '/leetcode.png', link: 'https://leetcode.com/u/shriramthebeast/' },
  { id: 'google', title: 'Google', link: 'https://google.com', inner: true },
  { id: 'youtube', title: 'YouTube', link: 'https://youtube.com', inner: true },
  { id: 'twitter', title: 'Twitter', link: 'https://twitter.com', inner: true },
];

const NavPage = ({ setGoURL }: { setGoURL: (url: string) => void }) => {
  return (
    <div className="w-full h-full overflow-y-auto bg-gradient-to-b from-zinc-800 to-zinc-900">
      <div className="max-w-3xl mx-auto p-8">
        {/* Favorites */}
        <div className="mb-8">
          <h2 className="text-white text-xl font-medium mb-4">Favorites</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-6">
            {favorites.map(site => (
              <div
                key={site.id}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => site.inner ? setGoURL(site.link) : window.open(site.link, '_blank')}
              >
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                  {site.img ? (
                    <img src={site.img} alt={site.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-lg font-medium">{site.title[0]}</span>
                  )}
                </div>
                <span className="mt-2 text-white/80 text-xs truncate max-w-[60px]">{site.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Report */}
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-white font-medium">Privacy Report</div>
              <div className="text-white/60 text-sm">Safari helps keep you safe from trackers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoInternetPage = () => (
  <div className="w-full h-full flex items-center justify-center bg-zinc-800">
    <div className="text-center text-white/60">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="mx-auto mb-4 opacity-50">
        <path d="M23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l10.08 12.56c.8 1 2.32 1 3.12 0L23.64 7z"/>
        <path d="M21.79 9.41L12 21.5 2.21 9.41c.85-.53 4.13-2.41 9.79-2.41s8.94 1.88 9.79 2.41z" fill="none" stroke="currentColor" strokeWidth="2"/>
      </svg>
      <div className="text-xl font-medium mb-2">You Are Not Connected to the Internet</div>
      <div className="text-sm">This page can't be displayed because your computer is currently offline.</div>
    </div>
  </div>
);

export default function SafariApp() {
  const wifi = useStore((state) => state.wifi);
  const [state, setState] = useState<SafariState>({
    goURL: '',
    currentURL: ''
  });

  const setGoURL = (url: string) => {
    if (url === '') {
      setState({ goURL: '', currentURL: '' });
      return;
    }

    let finalUrl = url;
    const isValidUrl = /^(https?:\/\/|www\.)/i.test(url) || /\.[a-z]{2,}$/i.test(url);

    if (isValidUrl) {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        finalUrl = `https://${url}`;
      }
    } else {
      finalUrl = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    }

    setState({ goURL: finalUrl, currentURL: finalUrl });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setGoURL((e.target as HTMLInputElement).value);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-800">
      {/* Browser Toolbar */}
      <div className="h-10 flex items-center gap-2 px-3 bg-zinc-700/50 border-b border-white/10">
        {/* Navigation buttons */}
        <button
          className={`w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 ${state.goURL ? 'text-white' : 'text-white/30'}`}
          onClick={() => setGoURL('')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button className="w-7 h-7 flex items-center justify-center rounded text-white/30">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>

        {/* URL Bar */}
        <div className="flex-1 mx-2">
          <input
            type="text"
            value={state.currentURL}
            onChange={(e) => setState(prev => ({ ...prev, currentURL: e.target.value }))}
            onKeyPress={handleKeyPress}
            placeholder="Search or enter website name"
            className="w-full h-7 px-3 rounded-md bg-zinc-600 text-white text-sm text-center placeholder-white/40 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Share button */}
        <button className={`w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 ${state.goURL ? 'text-white' : 'text-white/30'}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
          </svg>
        </button>
      </div>

      {/* Browser Content */}
      <div className="flex-1 overflow-hidden">
        {wifi ? (
          state.goURL === '' ? (
            <NavPage setGoURL={setGoURL} />
          ) : (
            <iframe
              src={state.goURL}
              title="Safari Browser"
              className="w-full h-full bg-white"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          )
        ) : (
          <NoInternetPage />
        )}
      </div>
    </div>
  );
}
