      import { useState, useCallback, useEffect } from 'react';
      import { FolderOpen, Code, GraduationCap, User, Award, Calendar } from 'lucide-react';
import natureWallpaper from '@/assets/nature-wallpaper.jpg';
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
      <div className="fixed bottom-4 left-0 right-0 z-50 pointer-events-auto flex justify-center">
        <Dock 
          openWindows={openWindows.map(w => w.id)} 
          onOpenApp={(appId) => {
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
