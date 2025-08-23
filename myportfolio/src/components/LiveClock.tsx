import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

export const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`
      z-50 p-2 md:p-4
      md:fixed md:top-4 md:left-1/2 md:-translate-x-1/2 md:glass md:rounded-xl md:mx-0
      flex flex-col items-end px-4
    `}>
      <div className="flex items-center gap-2 text-primary">
        <Clock size={14} className="md:w-[18px] md:h-[18px]" />
        <span className="text-base md:text-xl font-mono font-medium">
          {formatTime(currentTime)}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs md:text-sm opacity-80">
        <Calendar size={10} className="md:w-[14px] md:h-[14px]" />
        <span>{formatDate(currentTime)}</span>
      </div>
    </div>
  );
};