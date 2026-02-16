import { useState, useRef, useEffect, ReactNode } from 'react';
import { X, Minus, Square } from 'lucide-react';

export interface WindowProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  isMaximized?: boolean;
  mobileModal?: boolean; // Show as centered modal on mobile instead of fullscreen
}

export const Window = ({ 
  title, 
  children, 
  onClose, 
  onMinimize, 
  onMaximize,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 600, height: 400 },
  isMaximized = false,
  mobileModal = false
}: WindowProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: initialPosition.x, y: initialPosition.y });

  // Sync currentPosRef when position state changes
  useEffect(() => {
    currentPosRef.current = position;
  }, [position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      dragOffsetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      currentPosRef.current = position; // Store the starting position
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized && windowRef.current) {
        const newX = e.clientX - dragOffsetRef.current.x;
        const newY = e.clientY - dragOffsetRef.current.y;
        
        // Calculate the offset from the starting position
        const deltaX = newX - currentPosRef.current.x;
        const deltaY = newY - currentPosRef.current.y;
        
        // Use transform for smooth hardware-accelerated movement
        windowRef.current.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isDragging && windowRef.current) {
        // Calculate final position
        const newX = e.clientX - dragOffsetRef.current.x;
        const newY = e.clientY - dragOffsetRef.current.y;
        
        // Reset transform and update React state
        windowRef.current.style.transform = '';
        setPosition({ x: newX, y: newY });
        setIsDragging(false);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isMaximized]);

  const isMobile = window.innerWidth < 768;
  
  const windowStyle = isMobile && !mobileModal ? {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 40
  } : isMobile && mobileModal ? {
    position: 'fixed' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: '500px',
    maxHeight: '85vh',
    zIndex: 40,
    borderRadius: '12px',
    overflow: 'hidden'
  } : isMaximized ? {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 40
  } : {
    position: 'absolute' as const,
    left: position.x,
    top: position.y,
    width: size.width,
    height: size.height,
    zIndex: 40,
    willChange: isDragging ? 'transform' : 'auto',
    transition: isDragging ? 'none' : 'transform 0.1s ease-out'
  };

  return (
    <div 
      ref={windowRef}
      className={`window ${isMobile && mobileModal ? 'flex flex-col' : ''}`}
      style={{
        ...windowStyle,
        cursor: isDragging ? 'grabbing' : 'auto',
        userSelect: isDragging ? 'none' : 'auto',
        boxShadow: isMobile && mobileModal ? '0 20px 60px rgba(0,0,0,0.5)' : undefined
      }}
    >
      {/* Window Header */}
      <div 
        className={`flex items-center justify-between p-4 border-b sticky top-0 z-10 select-none ${isMobile && mobileModal ? '' : 'mt-9'}`}
        style={{
          borderColor: 'hsl(var(--glass-border) / 0.5)',
          background: 'linear-gradient(to bottom, hsl(var(--glass-bg) / 0.9), hsl(var(--glass-bg) / 0.8))',
          backdropFilter: 'blur(20px)',
          cursor: isMaximized || (isMobile && mobileModal) ? 'default' : 'grab'
        }}
        onMouseDown={handleMouseDown}
      >
        <span className="font-medium text-sm">{title}</span>
        
        <div className="flex gap-3">
          {onMinimize && (
            <div 
              className="w-5 h-5 rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center hover:scale-110 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #ffd93d, #ffcd02)',
                boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2)'
              }}
              onClick={onMinimize}
            >
              <Minus size={10} className="text-gray-800" />
            </div>
          )}
          {onMaximize && (
            <div 
              className="w-5 h-5 rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center hover:scale-110 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #6bcf7f, #57c267)',
                boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2)'
              }}
              onClick={onMaximize}
            >
              <Square size={10} className="text-gray-800" />
            </div>
          )}
          <div 
            className="w-5 h-5 rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center hover:scale-110 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
              boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2)'
            }}
            onClick={onClose}
          >
            <X size={10} className="text-gray-800" />
          </div>
        </div>
      </div>

      {/* Window Content */}
      <div className={`p-4 md:p-6 custom-scrollbar overflow-auto ${isMobile && mobileModal ? 'flex-1' : 'flex-1 h-[calc(100%-6.25rem)]'}`}>
        {children}
      </div>
    </div>
  );
};