import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

interface DockProps {
  openWindows: string[];
  onOpenApp?: (appId: string, title: string) => void;
}

export const Dock = ({ openWindows, onOpenApp }: DockProps) => {
  // External links (use personal links from upstream)
  const dockItems = [
    { id: 'github', icon: Github, href: 'https://github.com/BEASTSHRIRAM', label: 'GitHub', color: '#333' },
    { id: 'linkedin', icon: Linkedin, href: 'https://linkedin.com/in/shriram-kulkarni-033b8328a', label: 'LinkedIn', color: '#0077b5' },
    { id: 'email', icon: Mail, href: 'mailto:shrikulk20@gmail.com', label: 'Email', color: '#ea4335' },
    { id: 'resume', icon: ExternalLink, href: 'https://drive.google.com/file/d/1H4X-AazOrSGwJyb5X68blohyWTGxmAx8/preview', label: 'Resume', color: '#6366f1' },
  ];

  console.log('Dock rendering with openWindows:', openWindows);

  const handleDockClick = (item: typeof dockItems[0]) => {
    console.log('Dock item clicked:', item);
    if (item.href) {
      window.open(item.href, '_blank');
    }
  };

  return (
    <div className="dock" style={{ zIndex: 100 }}>
      {/* Open Application Indicators - shows a dot for currently open windows */}
      {openWindows.length > 0 && (
        <>
          {openWindows.map(windowId => (
            <div 
              key={windowId}
              className="dock-icon bg-opacity-80"
              title={`${windowId} - Open`}
              onClick={() => onOpenApp && onOpenApp(windowId, windowId)}
            >
              <div className="w-3 h-3 rounded-full bg-primary"></div>
            </div>
          ))}
          
          {/* Separator between open windows and external links */}
          <div className="w-px h-8 bg-glass-border mx-2"></div>
        </>
      )}
      
      {/* External Links */}
      {dockItems.map(item => (
        <div 
          key={item.id}
          className="dock-icon"
          onClick={() => handleDockClick(item)}
          title={item.label}
          style={{ color: item.color }}
        >
          <item.icon size={24} />
        </div>
      ))}
    </div>
  );
};
