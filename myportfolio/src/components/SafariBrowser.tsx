import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Square, RotateCcw, RotateCw, Home, Lock } from 'lucide-react';

interface BrowserTab {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  isActive: boolean;
}

interface SafariBrowserProps {
  isOpen: boolean;
  onClose: () => void;
  tabs: BrowserTab[];
  onTabChange: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onHomeClick?: () => void;
}

export const SafariBrowser = ({ 
  isOpen, 
  onClose, 
  tabs, 
  onTabChange, 
  onTabClose,
  onHomeClick 
}: SafariBrowserProps) => {
  const [isMaximized, setIsMaximized] = useState(true);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [swipeDistance, setSwipeDistance] = useState(0);
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTab = tabs.find(tab => tab.isActive);

  // Swipe detection constants
  const minSwipeDistance = 50;
  const swipeThreshold = 100;

  // Handle touch start
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
    setIsSwipeActive(true);
  };

  // Handle touch move
  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentTouch = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };

    const deltaX = currentTouch.x - touchStart.x;
    const deltaY = Math.abs(currentTouch.y - touchStart.y);

    // Only consider horizontal swipes (not vertical scrolling)
    if (deltaY < 50 && deltaX > 0) {
      setSwipeDistance(Math.min(deltaX, 200));
      e.preventDefault(); // Prevent scrolling during swipe
    }
  };

  // Handle touch end
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const currentTouch = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    setTouchEnd(currentTouch);
    
    const deltaX = currentTouch.x - touchStart.x;
    const deltaY = Math.abs(currentTouch.y - touchStart.y);

    // Check if it's a valid swipe (horizontal, sufficient distance)
    const isValidSwipe = deltaY < 50 && deltaX > swipeThreshold;

    if (isValidSwipe) {
      onClose(); // Close the browser on successful swipe
    }

    // Reset swipe state
    setTouchStart(null);
    setTouchEnd(null);
    setSwipeDistance(0);
    setIsSwipeActive(false);
  };

  // Handle escape key to close browser
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-9 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div 
        ref={containerRef}
        className={`bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 relative ${
          isMaximized 
            ? 'w-full h-full max-w-none max-h-none' 
            : 'w-full max-w-4xl h-[85vh] sm:h-[75vh]'
        }`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transform: isSwipeActive ? `translateX(${swipeDistance}px)` : 'translateX(0)',
          transition: isSwipeActive ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        {/* Swipe indicator for mobile */}
        {isSwipeActive && swipeDistance > 20 && (
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-black/20 rounded-full p-2 backdrop-blur-sm">
            <div className="w-5 h-5 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        )}

        {/* Title Bar */}
        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 h-10 sm:h-12 px-2 sm:px-4 border-b border-gray-200 dark:border-gray-700">
          {/* Window Controls */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={onClose}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors touch-manipulation"
              aria-label="Close"
            />
            <button
              onClick={onClose}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors touch-manipulation"
              aria-label="Minimize"
            />
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors touch-manipulation"
              aria-label="Maximize"
            />
          </div>

          {/* Tab Bar */}
          <div className="flex-1 flex items-center mx-2 sm:mx-4 max-w-2xl">
            <div className="flex space-x-0.5 sm:space-x-1 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 rounded-t-lg cursor-pointer min-w-0 max-w-32 sm:max-w-48 group touch-manipulation ${
                    tab.isActive
                      ? 'bg-white dark:bg-gray-900 border-t border-l border-r border-gray-200 dark:border-gray-700'
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => onTabChange(tab.id)}
                >
                  <Lock size={8} className="text-gray-400 flex-shrink-0 sm:w-3 sm:h-3" />
                  <span className="text-xs sm:text-sm truncate text-gray-700 dark:text-gray-300">
                    {tab.title}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTabClose(tab.id);
                    }}
                    className="opacity-70 sm:opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-600 rounded p-0.5 transition-opacity touch-manipulation"
                    aria-label="Close tab"
                  >
                    <X size={8} className="text-gray-500 sm:w-2.5 sm:h-2.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right side empty space for balance */}
          <div className="w-8 sm:w-16"></div>
        </div>

        {/* URL Bar */}
        <div className="bg-gray-50 dark:bg-gray-800 px-2 sm:px-4 py-1 sm:py-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded touch-manipulation">
              <RotateCcw size={12} className="text-gray-500 sm:w-4 sm:h-4" />
            </button>
            <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded touch-manipulation">
              <RotateCw size={12} className="text-gray-500 sm:w-4 sm:h-4" />
            </button>
            <button 
              onClick={() => onHomeClick && onHomeClick()}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded touch-manipulation"
              title="Go to home page"
            >
              <Home size={12} className="text-gray-500 sm:w-4 sm:h-4" />
            </button>
            <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg px-2 sm:px-3 py-1 border border-gray-300 dark:border-gray-600">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Lock size={10} className="text-green-500 sm:w-3.5 sm:h-3.5" />
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                  {activeTab?.url || 'certification-viewer://'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white dark:bg-gray-900 relative">
          {/* Mobile swipe instruction */}
          <div className="md:hidden bg-blue-50 dark:bg-blue-900/20 px-3 py-2 border-b border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-600 dark:text-blue-400 text-center">
              💡 Swipe right to return
            </p>
          </div>

          {activeTab && (
            <div className="h-full bg-gray-50 dark:bg-gray-800 flex flex-col">
              {/* Image container that fits perfectly */}
              <div className="flex-1 flex items-center justify-center p-4 pb-20">
                {activeTab.imageUrl.endsWith('.pdf') ? (
                  // PDF Viewer - Fit to container
                  <iframe
                    src={activeTab.imageUrl}
                    className="w-full h-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
                    title={activeTab.title}
                  />
                ) : (
                  // Image Viewer - Fit perfectly with zoom option
                  <img
                    src={activeTab.imageUrl}
                    alt={activeTab.title}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-lg cursor-zoom-in"
                    style={{ 
                      backgroundColor: '#ffffff'
                    }}
                    onClick={(e) => {
                      // Toggle zoom on click
                      const img = e.target as HTMLImageElement;
                      if (img.style.transform === 'scale(1.5)') {
                        img.style.transform = 'scale(1)';
                        img.style.cursor = 'zoom-in';
                      } else {
                        img.style.transform = 'scale(1.5)';
                        img.style.cursor = 'zoom-out';
                        img.style.transformOrigin = 'center';
                      }
                    }}
                    onLoad={() => console.log('Image loaded successfully:', activeTab.imageUrl)}
                    onError={(e) => {
                      console.error('Image failed to load:', activeTab.imageUrl);
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmYSIgc3Ryb2tlPSIjZTVlN2ViIiBzdHJva2Utd2lkdGg9IjIiLz48dGV4dCB4PSI1MCUiIHk9IjQwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY5NzA4MCIgZm9udC1zaXplPSIxOCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPkNlcnRpZmljYXRlIEltYWdlPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+RmFpbGVkIHRvIGxvYWQ8L3RleHQ+PC9zdmc+';
                    }}
                  />
                )}
              </div>
              
              {/* Optional verification link */}
              {activeTab.url && activeTab.url.startsWith('http') && (
                <div className="p-4 text-center border-t border-gray-200 dark:border-gray-700">
                  <a
                    href={activeTab.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 text-sm underline"
                  >
                    View Original Certificate
                  </a>
                </div>
              )}
            </div>
          )}
          
          {!activeTab && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400 p-4">
                <div className="text-4xl sm:text-6xl mb-4">🏆</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">No Certifications Open</h3>
                <p className="text-sm sm:text-base mb-4">Click on a certification thumbnail to view it here</p>
                <p className="text-xs text-gray-400 md:hidden">💡 Swipe right to go back</p>
                <div className="mt-4 text-xs text-gray-400">
                  <p>📱 Scroll to navigate • 🔍 Click images to zoom</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};