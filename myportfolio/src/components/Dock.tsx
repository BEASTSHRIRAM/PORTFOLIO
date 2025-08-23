import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

interface DockProps {
  openWindows: string[];
}

export const Dock = ({ openWindows }: DockProps) => {
const dockItems = [
    { id: 'github', icon: Github, href: 'https://github.com/BEASTSHRIRAM', label: 'GitHub', color: '#333' },
    { id: 'linkedin', icon: Linkedin, href: 'https://linkedin.com/in/shriram-kulkarni-033b8328a', label: 'LinkedIn', color: '#0077b5' },
    { id: 'email', icon: Mail, href: 'mailto:shrikulk20@gmail.com', label: 'Email', color: '#ea4335' },
    { id: 'resume', icon: ExternalLink, href: 'https://drive.google.com/file/d/1H4X-AazOrSGwJyb5X68blohyWTGxmAx8/view?usp=sharing', label: 'Resume', color: '#6366f1' },
  ];

  const handleDockClick = (href: string) => {
    if (href.startsWith('http') || href.startsWith('mailto:')) {
      window.open(href, '_blank');
    }
  };

  return (
    <div className="dock">
      {/* Open Application Indicators */}
      {openWindows.map(windowId => (
        <div 
          key={windowId}
          className="dock-icon bg-opacity-80"
          title={`${windowId} - Open`}
        >
          <div className="w-3 h-3 rounded-full bg-primary"></div>
        </div>
      ))}
      
      {/* Separator */}
      {openWindows.length > 0 && (
        <div className="w-px h-8 bg-glass-border mx-2"></div>
      )}
      
      {/* Static Dock Items */}
      {dockItems.map(item => (
        <div 
          key={item.id}
          className="dock-icon"
          onClick={() => handleDockClick(item.href)}
          title={item.label}
          style={{ color: item.color }}
        >
          <item.icon size={24} />
        </div>
      ))}
    </div>
  );
};
