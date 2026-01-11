import React, { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useStore } from "../../store";

interface WifiMenuProps {
  toggleWifiMenu: () => void;
  btnRef: React.RefObject<HTMLDivElement>;
}

export default function WifiMenu({ toggleWifiMenu, btnRef }: WifiMenuProps) {
  const wifiRef = useRef<HTMLDivElement>(null);
  const wifi = useStore((state) => state.wifi);
  const toggleWifi = useStore((state) => state.toggleWifi);

  useClickOutside(wifiRef, toggleWifiMenu, [btnRef as React.RefObject<HTMLElement>]);

  return (
    <div
      className="fixed top-9 right-2 w-72 bg-black/70 backdrop-blur-2xl border border-white/20 rounded-lg shadow-xl text-white text-sm z-[60] p-3"
      ref={wifiRef}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium">Wi-Fi</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={wifi}
            onChange={toggleWifi}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
        </label>
      </div>
      
      {wifi && (
        <div className="border-t border-white/20 pt-3">
          <div className="text-xs text-white/60 mb-2">Known Networks</div>
          <div className="flex items-center justify-between p-2 rounded hover:bg-white/10 cursor-pointer">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-white">
                <path d="M2.05 7.05a16 16 0 0 1 19.9 0M5.5 10.5a11 11 0 0 1 13 0M9 14a6 6 0 0 1 6 0M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Home WiFi</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-blue-400">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
