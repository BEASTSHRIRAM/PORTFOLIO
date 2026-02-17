import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, type MotionValue } from 'framer-motion';
import { useStore } from '../store';
import { Launchpad } from './Launchpad';

interface DockProps {
  openWindows: string[];
  onOpenApp?: (appId: string, title: string, fromLaunchpad?: boolean) => void;
  shouldOpenLaunchpad?: boolean;
  onLaunchpadStateChange?: (isOpen: boolean) => void;
}

interface DockItem {
  id: string;
  icon?: any;
  image?: string;
  href?: string;
  label: string;
  color?: string;
}

// Custom hook for dock hover animation with RAF-based smooth updates
const useDockHoverAnimation = (
  mouseX: MotionValue<number | null>,
  ref: React.RefObject<HTMLElement>,
  dockSize: number,
  dockMag: number
) => {
  const distanceLimit = dockSize * 6;
  
  // 7-point curve for smooth magnification falloff
  const distanceInput = [
    -distanceLimit,
    -distanceLimit / 1.75,
    -distanceLimit / 2.5,
    0,
    distanceLimit / 2.5,
    distanceLimit / 1.75,
    distanceLimit
  ];
  
  const widthOutput = [
    dockSize,
    dockSize * 1.2,
    dockSize * 1.4,
    dockSize * dockMag,
    dockSize * 1.4,
    dockSize * 1.2,
    dockSize
  ];
  
  const beyondTheDistanceLimit = distanceLimit + 1;
  const distance = useMotionValue(beyondTheDistanceLimit);
  
  const widthPX = useSpring(
    useTransform(distance, distanceInput, widthOutput),
    {
      stiffness: 1300,
      damping: 80
    }
  );
  
  const width = useTransform(widthPX, (w) => `${w}px`);
  
  useEffect(() => {
    let rafId: number;
    
    const updateDistance = () => {
      const el = ref.current;
      const mouseXVal = mouseX.get();
      
      if (el && mouseXVal !== null) {
        const rect = el.getBoundingClientRect();
        const imgCenterX = rect.left + rect.width / 2;
        const distanceDelta = mouseXVal - imgCenterX;
        distance.set(distanceDelta);
      } else {
        distance.set(beyondTheDistanceLimit);
      }
      
      rafId = requestAnimationFrame(updateDistance);
    };
    
    updateDistance();
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mouseX, ref, distance, beyondTheDistanceLimit]);
  
  return { width, widthPX };
};

const DockItem = ({ 
  item, 
  mouseX, 
  onOpenApp, 
  isOpen,
  dockSize,
  dockMag
}: { 
  item: DockItem; 
  mouseX: MotionValue<number | null>; 
  onOpenApp?: (id: string, label: string) => void;
  isOpen: boolean;
  dockSize: number;
  dockMag: number;
}) => {
  const imgRef = useRef<HTMLLIElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  
  const { width } = useDockHoverAnimation(mouseX, imgRef, dockSize, dockMag);

  const handleClick = () => {
    if (item.href) {
      window.open(item.href, '_blank');
    } else if (onOpenApp) {
      onOpenApp(item.id, item.label);
    }
  };

  return (
    <motion.li
      ref={imgRef}
      onClick={handleClick}
      onMouseEnter={() => !isMobile && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={isMobile ? { width: `${dockSize}px`, height: `${dockSize}px` } : { width, height: width }}
      className="relative flex flex-col items-center justify-end cursor-pointer"
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full mb-2 px-2.5 py-1 bg-gray-800/90 text-white text-xs rounded-md whitespace-nowrap pointer-events-none backdrop-blur-sm z-50"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon/Image Container */}
      <div className="w-full h-full flex items-center justify-center p-1">
        {item.icon ? (
          <item.icon 
            className="w-[70%] h-[70%]"
            style={{ color: item.color }}
          />
        ) : (
          <motion.img 
            src={item.image} 
            alt={item.label}
            title={item.label}
            className="w-full h-full object-contain"
            draggable={false}
            style={{ willChange: isMobile ? 'auto' : 'width' }}
          />
        )}
      </div>

      {/* Open indicator dot */}
      {isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-white/80"
        />
      )}
    </motion.li>
  );
};

export const Dock = ({ openWindows, onOpenApp, shouldOpenLaunchpad, onLaunchpadStateChange }: DockProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue<number | null>(null);
  const dockSize = useStore((state) => state.dockSize);
  const dockMag = useStore((state) => state.dockMag);
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  // Watch for external trigger to open Launchpad
  useEffect(() => {
    if (shouldOpenLaunchpad && !isLaunchpadOpen) {
      setIsLaunchpadOpen(true);
      onLaunchpadStateChange?.(true);
    }
  }, [shouldOpenLaunchpad, isLaunchpadOpen, onLaunchpadStateChange]);

  // Notify parent when Launchpad state changes
  useEffect(() => {
    onLaunchpadStateChange?.(isLaunchpadOpen);
  }, [isLaunchpadOpen, onLaunchpadStateChange]);

  // Main dock apps (macOS style)
  const dockApps: DockItem[] = [
    { id: 'launchpad', image: '/launchpad.png', label: 'Launchpad' },
    { id: 'safari', image: '/safari.png', label: 'Safari' },
    { id: 'facetime', image: '/facetime.png', label: 'FaceTime' },
    { id: 'terminal', image: '/terminal.png', label: 'Terminal' },
    { id: 'vscode', image: '/vscode.png', label: 'VS Code' },
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMobile) {
      mouseX.set(e.clientX);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      mouseX.set(null);
    }
  };

  const handleDockItemClick = (item: DockItem) => {
    if (item.id === 'launchpad') {
      setIsLaunchpadOpen(true);
    } else if (item.href) {
      window.open(item.href, '_blank');
    } else if (onOpenApp) {
      onOpenApp(item.id, item.label);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLaunchpadOpen && (
          <Launchpad
            onClose={() => setIsLaunchpadOpen(false)}
            onOpenApp={(appId, title) => {
              setIsLaunchpadOpen(false);
              if (onOpenApp) onOpenApp(appId, title, true); // Mark as opened from Launchpad
            }}
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-50 flex justify-center">
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          <motion.ul
            className="flex gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl"
            style={{
              height: 'auto',
              minHeight: `${dockSize + 16}px`,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
          {/* Main apps */}
          {dockApps.map(item => (
            <DockItem 
              key={item.id}
              item={item}
              dockSize={dockSize}
              dockMag={dockMag}
              mouseX={mouseX}
              onOpenApp={() => handleDockItemClick(item)}
              isOpen={openWindows.includes(item.id)}
            />
          ))}
        </motion.ul>
        </motion.div>
      </div>
    </>
  );
};
