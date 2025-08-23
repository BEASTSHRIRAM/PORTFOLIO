import { useState, useCallback } from 'react';
import { FolderOpen, Code, GraduationCap, User } from 'lucide-react';
import natureWallpaper from '@/assets/nature-wallpaper.jpg';

import { BootSequence } from './BootSequence';
import { DesktopIcon } from './DesktopIcon';
import { Window } from './Window';
import { Dock } from './Dock';
import { LiveClock } from './LiveClock';

import { ProjectsApp } from './applications/ProjectsApp';
import { SkillsApp } from './applications/SkillsApp';
import { EducationApp } from './applications/EducationApp';
import { AboutApp } from './applications/AboutApp';

interface OpenWindow {
  id: string;
  title: string;
  component: JSX.Element;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized: boolean;
}

export const Desktop = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
  }, []);

  const openWindow = useCallback((windowId: string, title: string, component: JSX.Element) => {
    const existingWindow = openWindows.find(w => w.id === windowId);
    if (existingWindow) {
      
      setOpenWindows(prev => [
        ...prev.filter(w => w.id !== windowId),
        existingWindow
      ]);
      return;
    }

    const newWindow: OpenWindow = {
      id: windowId,
      title,
      component,
      position: { 
        x: 50 + openWindows.length * 40, 
        y: 50 + openWindows.length * 40 
      },
      size: { width: 800, height: 600 },
      isMaximized: true // Open fullscreen by default
    };

    setOpenWindows(prev => [...prev, newWindow]);
  }, [openWindows]);

  const closeWindow = useCallback((windowId: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== windowId));
  }, []);

  const maximizeWindow = useCallback((windowId: string) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  }, []);

  const minimizeWindow = useCallback((windowId: string) => {
    
    closeWindow(windowId);
  }, [closeWindow]);

  const desktopApps = [
    {
      id: 'projects',
      icon: FolderOpen,
      label: 'Projects',
      component: <ProjectsApp />,
      colorClass: 'icon-projects text-orange-500'
    },
    {
      id: 'skills',
      icon: Code,
      label: 'Skills',
      component: <SkillsApp />,
      colorClass: 'icon-skills text-blue-500'
    },
    {
      id: 'education',
      icon: GraduationCap,
      label: 'Education',
      component: <EducationApp />,
      colorClass: 'icon-education text-green-500'
    },
    {
      id: 'about',
      icon: User,
      label: 'About Me',
      component: <AboutApp />,
      colorClass: 'icon-about text-red-500'
    }
  ];

  if (isBooting) {
    return <BootSequence onBootComplete={handleBootComplete} />;
  }

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden before:content-[''] before:fixed before:inset-0 before:z-0"
      style={{
        backgroundColor: '#1a1b1e'
      }}
    >
      
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${natureWallpaper})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.7
        }}
      />
      
      <div 
        className="fixed inset-0 z-0 bg-gradient-to-b from-background/40 via-background/20 to-background/40"
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-transparent to-background/30"></div>
      
      
      <div
        className={`relative z-10 p-4 md:p-8 transition-opacity duration-300 ${
          openWindows.length > 0 ? 'md:opacity-100 opacity-0 pointer-events-none md:pointer-events-auto' : 'opacity-100'
        }`}
      >
        <div className="hidden md:flex flex-col items-center w-full">
          
          <div style={{ height: '90px' }} />
          <div className="flex justify-center w-full">
            <div className="grid grid-cols-4 gap-6 max-w-4xl">
              {desktopApps.map(app => (
                <DesktopIcon
                  key={app.id}
                  icon={app.icon}
                  label={app.label}
                  colorClass={app.colorClass}
                  onClick={() => openWindow(app.id, app.label, app.component)}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="md:hidden grid grid-cols-2 gap-4 max-w-4xl">
          {desktopApps.map(app => (
            <DesktopIcon
              key={app.id}
              icon={app.icon}
              label={app.label}
              colorClass={app.colorClass}
              onClick={() => openWindow(app.id, app.label, app.component)}
            />
          ))}
        </div>
      </div>

      
      <div className={`md:hidden fixed inset-0 z-20 transition-opacity duration-300 ${
        openWindows.length === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        
        <div className="min-h-screen flex flex-col bg-background/60 backdrop-blur-md">
          
          <div className="bg-background/40 backdrop-blur-sm md:hidden">
            <LiveClock />
          </div>

          
          <div className="px-6 py-4 text-center">
            <h1 className="text-xl font-bold mb-1">Shriram Kulkarni</h1>
            <p className="text-primary text-sm">Full Stack Developer & AI Enthusiast</p>
            <p className="text-xs opacity-80 mt-1">Building Scalable AI-Driven Solutions</p>
          </div>

          
          <div className="flex-1 px-4 py-6">
            <div className="grid grid-cols-4 gap-y-6 max-w-md mx-auto">
              {desktopApps.map(app => (
                <div
                  key={app.id}
                  className="flex flex-col items-center justify-center gap-2"
                  onClick={() => openWindow(app.id, app.label, app.component)}
                >
                  <div className="glass-hover w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 active:scale-95">
                    <app.icon size={28} className={app.colorClass} />
                  </div>
                  <span className="text-xs font-medium text-center">{app.label}</span>
                </div>
              ))}
            </div>
          </div>

          
          <div className="w-full px-6 pb-8 fixed bottom-0 left-0">
            <div className="glass-hover rounded-2xl p-3 mx-auto max-w-xs flex justify-center items-center gap-8">
              <a 
                href="https://linkedin.com/in/shriram-kulkarni-033b8328a" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#0077b5] hover:opacity-80 transition-opacity"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a 
                href="mailto:shrikulk20@gmail.com" 
                className="text-[#ea4335] hover:opacity-80 transition-opacity"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a>
              <a 
                href="https://github.com/BEASTSHRIRAM" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:opacity-80 transition-opacity"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Open Windows */}
      {openWindows.map(window => (
        <div
          key={window.id}
          className={`${
            
            'md:relative fixed md:inset-auto inset-0 z-30'
          }`}
        >
          <Window
            title={window.title}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            initialPosition={window.position}
            initialSize={window.size}
            isMaximized={window.isMaximized}
          >
            {window.component}
          </Window>
        </div>
      ))}


      
      <div className="hidden md:block">
        <LiveClock />
      </div>

      
      <Dock openWindows={openWindows.map(w => w.id)} />
    </div>
  );
};
