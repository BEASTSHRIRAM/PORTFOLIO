import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { Launchpad } from './Launchpad';

interface DockProps {
  openWindows: string[];
  onOpenApp?: (appId: string, title: string) => void;
}

interface DockItem {
  id: string;
  icon?: any;
  image?: string;
  href?: string;
  label: string;
  color?: string;
}

const DockItem = ({ 
  item, 
  mouseX, 
  onOpenApp, 
  isOpen,
  dockSize,
  dockMag
}: { 
  item: DockItem; 
  mouseX: any; 
  onOpenApp?: (id: string, label: string) => void;
  isOpen: boolean;
  dockSize: number;
  dockMag: number;
}) => {
  const imgRef = useRef<HTMLLIElement>(null);
  
  const distance = useMotionValue<number>(9999);
  
  const minSize = dockSize * 0.5;
  const maxSize = dockSize * dockMag;
  
  const widthSync = useSpring(
    useTransform(distance, [-200, 0, 200], [minSize, maxSize, minSize]),
    { damping: 20, stiffness: 300 }
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const imgCenterX = rect.left + rect.width / 2;
    const distanceDelta = (e as any).clientX - imgCenterX;
    distance.set(distanceDelta);
  };

  const handleMouseLeave = () => {
    distance.set(9999);
  };

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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ width: widthSync }}
      className="relative flex flex-col items-center justify-end cursor-pointer"
    >
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: -30 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-full mb-2 px-3 py-1 bg-black/70 text-white text-xs rounded-md whitespace-nowrap pointer-events-none"
      >
        {item.label}
      </motion.div>

      {/* Icon/Image */}
      <div className="w-full flex items-center justify-center" style={{ height: `${dockSize}px` }}>
        {item.icon ? (
          <item.icon 
            size={dockSize * 0.7} 
            style={{ color: item.color }}
            className="transition-transform"
          />
        ) : (
          <img 
            src={item.image} 
            alt={item.label}
            className="h-full w-full object-contain"
            draggable={false}
          />
        )}
      </div>

      {/* Open indicator dot */}
      {isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-2 h-2 rounded-full bg-white mt-1"
        />
      )}
    </motion.li>
  );
};

export const Dock = ({ openWindows, onOpenApp }: DockProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue<number>(0);
  const dockSize = useStore((state) => state.dockSize);
  const dockMag = useStore((state) => state.dockMag);
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false);

  // Main dock apps (macOS style)
  const dockApps: DockItem[] = [
    { id: 'launchpad', image: '/launchpad.png', label: 'Launchpad' },
    { id: 'safari', image: '/safari.png', label: 'Safari' },
    { id: 'facetime', image: '/facetime.png', label: 'FaceTime' },
    { id: 'terminal', image: '/terminal.png', label: 'Terminal' },
    { id: 'vscode', image: '/vscode.png', label: 'VS Code' },
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
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
          <Launchpad onClose={() => setIsLaunchpadOpen(false)} />
        )}
      </AnimatePresence>

      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
      >
        <motion.ul
          className="flex gap-2 px-3 py-2 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20"
          style={{
            minHeight: `${dockSize + 30}px`,
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
    </>
  );
};
