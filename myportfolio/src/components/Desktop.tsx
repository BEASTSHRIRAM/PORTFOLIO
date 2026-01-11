      import { useState, useCallback, useEffect } from 'react';
      import { FolderOpen, Code, GraduationCap, User, Award, Calendar, Shuffle } from 'lucide-react';
      import desktopWallpaper from '@/assets/desktop-wallpaper.jpg';
      import natureWallpaper from '@/assets/nature-wallpaper.jpg';
      import os1 from '@/assets/os1.jpg';
      import os2 from '@/assets/os2.jpeg';
      import os3 from '@/assets/os3.jpg';
      import os4 from '@/assets/os4.jpg';
import { BootSequence } from './BootSequence';
import { DesktopIcon } from './DesktopIcon';
import { Window } from './Window';
import { Dock } from './Dock';
import { MenuBar } from './MenuBar';
import { ProjectsApp } from './applications/ProjectsApp';
import { SkillsApp } from './applications/SkillsApp';
import { EducationApp } from './applications/EducationApp';
import { AboutApp } from './applications/AboutApp';
import { CertificationsApp } from './applications/CertificationsApp';
import { InvolvementsApp } from './applications/InvolvementsApp';
import FaceTimeApp from './applications/FaceTimeApp';
import SafariApp from './applications/SafariApp';
import TerminalApp from './applications/TerminalApp';
import VSCodeApp from './applications/VSCodeApp';

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
  // Wallpaper state — default to the previously used nature wallpaper
  const STORAGE_KEY = 'portfolio:wallpaper';

  // Load persisted wallpaper or default to nature
  const [currentWallpaper, setCurrentWallpaper] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved || natureWallpaper;
    } catch (err) {
      return natureWallpaper;
    }
  });

  // All available wallpapers to pick from
  const wallpapers = [desktopWallpaper, natureWallpaper, os1, os2, os3, os4];

  // Persist wallpaper whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, currentWallpaper);
    } catch (e) {
      // ignore
    }
  }, [currentWallpaper]);

  // Handle mobile back (popstate) to close topmost window
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      if (window.innerWidth < 768 && openWindows.length > 0) {
        setOpenWindows(prev => prev.slice(0, -1));
        window.history.pushState(null, '', window.location.href);
      }
    };
    if (window.innerWidth < 768) {
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', onPopState);
    }
    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, [openWindows]);

  const surpriseWallpaper = useCallback(() => {
    // choose a different wallpaper at random
    const choices = wallpapers.filter(w => w !== currentWallpaper);
    if (choices.length === 0) return;
    const idx = Math.floor(Math.random() * choices.length);
    setCurrentWallpaper(choices[idx]);
  }, [currentWallpaper]);

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
      id: 'certifications',
      icon: Award,
      label: 'Certifications',
      component: <CertificationsApp />,
      colorClass: 'icon-certifications text-yellow-500'
    },
    {
      id: 'involvements',
      icon: Calendar,
      label: 'Involvements',
      component: <InvolvementsApp />,
      colorClass: 'icon-involvements text-indigo-500'
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

  // Dock-specific apps (macOS style apps)
  const dockAppsMap: { [key: string]: { label: string; component: JSX.Element } } = {
    safari: { label: 'Safari', component: <SafariApp /> },
    facetime: { label: 'FaceTime', component: <FaceTimeApp /> },
    terminal: { label: 'Terminal', component: <TerminalApp /> },
    vscode: { label: 'VS Code', component: <VSCodeApp /> },
  };

  if (isBooting) {
    return <BootSequence onBootComplete={handleBootComplete} />;
  }

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden before:content-[''] before:fixed before:inset-0 before:z-0 pt-9"
      style={{
        backgroundColor: '#1a1b1e'
      }}
    >
      <MenuBar />
      {/* Surprise me button + label - picks a random wallpaper from assets */}
      <div className="fixed right-6 top-14 z-40 flex items-center space-x-3">
        <span className="hidden sm:inline-block text-sm text-white dark:text-white">Click for a surprise</span>
        <div>
          <button
            onClick={surpriseWallpaper}
            title="Surprise me"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white/90 dark:bg-gray-800/80 shadow-md hover:scale-105 transition-transform backdrop-blur"
          >
            <Shuffle className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>
        </div>
      </div>
      
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${currentWallpaper})`,
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
          openWindows.length > 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Unified responsive icon area (centered for all breakpoints) */}
        <div className="flex items-center justify-center w-full min-h-[calc(100vh-180px)]">
          <div className="grid gap-6 sm:gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 place-items-center max-w-5xl">
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

      {/* Open Windows */}
      {openWindows.map(window => (
        <div
          key={window.id}
          className={
            'md:relative fixed md:inset-auto inset-0 z-40 pointer-events-auto'
          }
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
      
      {/* Dock is now placed in a separate div with guaranteed visibility and interactivity */}
      <div className={`fixed bottom-4 left-0 right-0 z-50 pointer-events-auto flex justify-center transition-opacity duration-300 ${
        openWindows.length > 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <Dock 
          openWindows={openWindows.map(w => w.id)} 
          onOpenApp={(appId, label) => {
            // Check dock apps first
            if (dockAppsMap[appId]) {
              openWindow(appId, dockAppsMap[appId].label, dockAppsMap[appId].component);
              return;
            }
            // Then check desktop apps
            const app = desktopApps.find(a => a.id === appId);
            if (app) {
              openWindow(appId, app.label, app.component);
            }
          }} 
        />
      </div>
    </div>
  );
};
