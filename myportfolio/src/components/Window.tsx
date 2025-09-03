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
}

export const Window = ({ 
  title, 
  children, 
  onClose, 
  onMinimize, 
  onMaximize,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 600, height: 400 },
  isMaximized = false
}: WindowProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isMaximized]);

  const isMobile = window.innerWidth < 768;
  
  const windowStyle = isMobile ? {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 40
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
    zIndex: 40
  };

  return (
    <div 
      ref={windowRef}
      className="window"
      style={windowStyle}
    >
      {/* Window Header */}
      <div 
        className="flex items-center justify-between p-4 border-b sticky top-0 z-10 cursor-move select-none mt-9"
        style={{
          borderColor: 'hsl(var(--glass-border) / 0.5)',
          background: 'linear-gradient(to bottom, hsl(var(--glass-bg) / 0.9), hsl(var(--glass-bg) / 0.8))',
          backdropFilter: 'blur(20px)'
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
      <div className="flex-1 p-4 md:p-6 custom-scrollbar overflow-auto h-[calc(100%-6.25rem)]">
        {children}
      </div>
    </div>
  );
};