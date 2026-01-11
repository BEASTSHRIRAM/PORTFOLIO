import { useState, useEffect } from 'react';

interface BatteryState {
  level: number;
  charging: boolean;
}

export default function Battery() {
  const [battery, setBattery] = useState<BatteryState>({ level: 100, charging: false });

  useEffect(() => {
    const getBattery = async () => {
      try {
        // @ts-ignore - Battery API is not in TypeScript types
        if ('getBattery' in navigator) {
          // @ts-ignore
          const bat = await navigator.getBattery();
          setBattery({
            level: Math.round(bat.level * 100),
            charging: bat.charging
          });

          bat.addEventListener('levelchange', () => {
            setBattery(prev => ({ ...prev, level: Math.round(bat.level * 100) }));
          });
          bat.addEventListener('chargingchange', () => {
            setBattery(prev => ({ ...prev, charging: bat.charging }));
          });
        }
      } catch (error) {
        // Battery API not supported, use default
        console.log('Battery API not supported');
      }
    };

    getBattery();
  }, []);

  const getBatteryColor = () => {
    if (battery.charging) return '#34c759';
    if (battery.level <= 20) return '#ff3b30';
    return 'white';
  };

  return (
    <div className="flex items-center gap-1">
      <span className="text-xs text-white/80">{battery.level}%</span>
      <div className="relative">
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          {/* Battery body */}
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="white" strokeOpacity="0.8"/>
          {/* Battery tip */}
          <path d="M23 4V8C24.1046 8 25 7.10457 25 6V6C25 4.89543 24.1046 4 23 4Z" fill="white" fillOpacity="0.8"/>
          {/* Battery level */}
          <rect 
            x="2" 
            y="2" 
            width={Math.max(0, (battery.level / 100) * 18)} 
            height="8" 
            rx="1" 
            fill={getBatteryColor()}
          />
        </svg>
        {battery.charging && (
          <svg 
            width="8" 
            height="10" 
            viewBox="0 0 24 24" 
            fill="#34c759" 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <path d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1l-1 7h3.51c.4 0 .62.19.4.66C12.97 17.55 11 21 11 21z"/>
          </svg>
        )}
      </div>
    </div>
  );
}
