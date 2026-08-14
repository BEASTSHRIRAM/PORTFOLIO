      import { useState, useCallback, useEffect } from 'react';
      import { FolderOpen, Code, GraduationCap, User, Award, Calendar, Shuffle } from 'lucide-react';
      import desktopWallpaper from '@/assets/desktop-wallpaper.jpg';
      import natureWallpaper from '@/assets/nature-wallpaper.jpg';
      import os1 from '@/assets/os1.jpg';
      import os2 from '@/assets/os2.jpeg';
      import os3 from '@/assets/os3.jpg';
      import os4 from '@/assets/os4.jpg';
      import os5 from '@/assets/os5.jpg';
import { BootSequence } from './BootSequence';
import { DesktopIcon } from './DesktopIcon';
import { Window } from './Window';
import { Dock } from './Dock';
import { MenuBar } from './MenuBar';
import { LoginScreen } from './LoginScreen';
import { ShutdownScreen } from './ShutdownScreen';
import { SleepScreen } from './SleepScreen';
import { ProjectsApp } from './applications/ProjectsApp';
import { SkillsApp } from './applications/SkillsApp';
import { EducationApp } from './applications/EducationApp';
import { ExperienceApp } from './applications/ExperienceApp';
import { AboutApp } from './applications/AboutApp';
import { CertificationsApp } from './applications/CertificationsApp';
import { InvolvementsApp } from './applications/InvolvementsApp';
import FaceTimeApp from './applications/FaceTimeApp';
import SafariApp from './applications/SafariApp';
import TerminalApp from './applications/TerminalApp';
import VSCodeApp from './applications/VSCodeApp';
import BeastApp from './applications/BeastApp';

interface OpenWindow {
  id: string;
  title: string;
  component: JSX.Element;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized: boolean;
  mobileModal?: boolean;
  openedFromLaunchpad?: boolean;
}

export const Desktop = () => {
  const [isBooting, setIsBooting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [shouldReopenLaunchpad, setShouldReopenLaunchpad] = useState(false);
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
    setIsLoggedIn(true);
    // Auto-open BeastApp after boot
    setBeastAutoOpen(true);
  }, []);

  const handleLogin = useCallback(() => {
    // Trigger boot sequence after login
    setIsBooting(true);
  }, []);

  const handleLockScreen = useCallback(() => {
    setIsLoggedIn(false);
    setOpenWindows([]);
  }, []);

  const handleShutdown = useCallback(() => {
    setIsShuttingDown(true);
    setOpenWindows([]);
  }, []);

  const handleShutdownComplete = useCallback(() => {
    // Reset to login screen
    setIsShuttingDown(false);
    setIsLoggedIn(false);
    setIsBooting(false);
  }, []);

  const handleSleep = useCallback(() => {
    setIsSleeping(true);
    setOpenWindows([]);
  }, []);

  const handleWakeUp = useCallback(() => {
    setIsSleeping(false);
    // Stay logged in after waking up
  }, []);

  const [beastAutoOpen, setBeastAutoOpen] = useState(false);

  const openWindow = useCallback((windowId: string, title: string, component: JSX.Element, fromLaunchpad?: boolean) => {
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
      isMaximized: true, // Open fullscreen by default
      openedFromLaunchpad: fromLaunchpad
    };

    setOpenWindows(prev => [...prev, newWindow]);
  }, [openWindows]);

  const closeWindow = useCallback((windowId: string) => {
    const windowToClose = openWindows.find(w => w.id === windowId);
    if (windowToClose?.openedFromLaunchpad) {
      setShouldReopenLaunchpad(true);
    }
    setOpenWindows(prev => prev.filter(w => w.id !== windowId));
  }, [openWindows]);

  const maximizeWindow = useCallback((windowId: string) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  }, []);

  const minimizeWindow = useCallback((windowId: string) => {
    closeWindow(windowId);
  }, [closeWindow]);

  // Helper to open an app by id (used by BeastApp quick links)
  const openAppById = useCallback(
    (appId: string) => {
      const all: { id: string; label: string; component: JSX.Element }[] = [
        { id: 'projects', label: 'Projects', component: <ProjectsApp /> },
        { id: 'experience', label: 'Experience', component: <ExperienceApp /> },
        { id: 'certifications', label: 'Certifications', component: <CertificationsApp /> },
        { id: 'involvements', label: 'Involvements', component: <InvolvementsApp /> },
        { id: 'skills', label: 'Skills', component: <SkillsApp /> },
        { id: 'education', label: 'Education', component: <EducationApp /> },
        { id: 'about', label: 'About Me', component: <AboutApp /> },
      ];
      const target = all.find((a) => a.id === appId);
      if (target) openWindow(target.id, target.label, target.component);
    },
    [openWindow]
  );

  // Auto-open BeastApp once after boot (non-maximized / minimized style)
  useEffect(() => {
    if (beastAutoOpen) {
      const beastWindow: OpenWindow = {
        id: 'beast',
        title: 'Welcome',
        component: <BeastApp />,
        position: { x: 80, y: 60 },
        size: { width: 520, height: 480 },
        isMaximized: false,
        mobileModal: true, // Show as centered modal on mobile
      };
      setOpenWindows(prev => [...prev, beastWindow]);
      setBeastAutoOpen(false);
    }
  }, [beastAutoOpen, openAppById]);

  // Portfolio apps are now only accessible via Launchpad
  const desktopApps: any[] = [];

  // Dock-specific apps (macOS style apps)
  const dockAppsMap: { [key: string]: { label: string; component: JSX.Element } } = {
    safari: { label: 'Safari', component: <SafariApp /> },
    facetime: { label: 'FaceTime', component: <FaceTimeApp /> },
    terminal: { label: 'Terminal', component: <TerminalApp /> },
    vscode: { label: 'VS Code', component: <VSCodeApp /> },
  };

  if (isShuttingDown) {
    return <ShutdownScreen onShutdownComplete={handleShutdownComplete} />;
  }

  if (isSleeping) {
    return <SleepScreen onWakeUp={handleWakeUp} />;
  }

  if (isBooting) {
    return <BootSequence onBootComplete={handleBootComplete} />;
  }

  if (!isLoggedIn) {
    return (
      <LoginScreen 
        onLogin={handleLogin}
        userName="Sriram Kulkarni"
        userPhoto="/yo.jpeg"
        wallpaper={os5}
      />
    );
  }

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden before:content-[''] before:fixed before:inset-0 before:z-0 pt-9"
      style={{
        backgroundColor: '#1a1b1e'
      }}
    >
      <MenuBar 
        onLockScreen={handleLockScreen}
        onShutdown={handleShutdown}
        onSleep={handleSleep}
      />
      {/* Surprise me button + label - picks a random wallpaper from assets */}
      <div className="fixed right-6 top-14 z-20 flex items-center space-x-3">
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
          className="fixed inset-0 z-40 pointer-events-none"
        >
          {/* Mobile modal backdrop */}
          {window.mobileModal && (
            <div className="md:hidden fixed inset-0 bg-black/20 pointer-events-auto" />
          )}
          <div className="pointer-events-auto w-full h-full">
          <Window
            title={window.title}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            initialPosition={window.position}
            initialSize={window.size}
            isMaximized={window.isMaximized}
            mobileModal={window.mobileModal}
          >
            {window.component}
          </Window>
          </div>
        </div>
      ))}
      
      {/* Dock is now placed in a separate div with guaranteed visibility and interactivity */}
      <div className={`fixed bottom-4 left-0 right-0 z-50 pointer-events-auto flex justify-center transition-opacity duration-300 ${
        openWindows.some(w => w.isMaximized) ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <Dock 
          openWindows={openWindows.map(w => w.id)} 
          shouldOpenLaunchpad={shouldReopenLaunchpad}
          onLaunchpadStateChange={(isOpen) => {
            if (isOpen) setShouldReopenLaunchpad(false);
          }}
          onOpenApp={(appId, label, fromLaunchpad) => {
            // Check dock apps first
            if (dockAppsMap[appId]) {
              openWindow(appId, dockAppsMap[appId].label, dockAppsMap[appId].component, fromLaunchpad);
              return;
            }
            // Then check desktop apps
            const app = desktopApps.find(a => a.id === appId);
            if (app) {
              openWindow(appId, app.label, app.component, fromLaunchpad);
              return;
            }
            // Fallback: portfolio apps from Launchpad
            const portfolioApp = [
              { id: 'projects', label: 'Projects', component: <ProjectsApp /> },
              { id: 'experience', label: 'Experience', component: <ExperienceApp /> },
              { id: 'certifications', label: 'Certifications', component: <CertificationsApp /> },
              { id: 'involvements', label: 'Involvements', component: <InvolvementsApp /> },
              { id: 'skills', label: 'Skills', component: <SkillsApp /> },
              { id: 'education', label: 'Education', component: <EducationApp /> },
              { id: 'about', label: 'About Me', component: <AboutApp /> },
            ].find(a => a.id === appId);
            if (portfolioApp) {
              openWindow(portfolioApp.id, portfolioApp.label, portfolioApp.component, fromLaunchpad);
            }
          }} 
        />
      </div>
    </div>
  );
};
