import { Github, Linkedin, Mail } from 'lucide-react';

interface DockProps {
  openWindows: string[];
  onOpenApp?: (appId: string, title: string) => void;
}

export const Dock = ({ openWindows, onOpenApp }: DockProps) => {
  const dockItems: Array<{
    id: string;
    icon?: any;
    image?: string;
    href: string;
    label: string;
    color?: string;
  }> = [
    { id: 'github', icon: Github, href: 'https://github.com/BEASTSHRIRAM', label: 'GitHub', color: '#333' },
    { id: 'linkedin', icon: Linkedin, href: 'https://linkedin.com/in/sriramkulkarni7878', label: 'LinkedIn', color: '#0077b5' },
    { id: 'email', icon: Mail, href: 'mailto:shrikulk20@gmail.com', label: 'Email', color: '#ea4335' },
    { id: 'resume', image: '/resumelogo.png', href: 'https://drive.google.com/file/d/14F08lty-q1kQlOZbuh7JeuoO46msEpFg/view?usp=sharing', label: 'Resume' },
    { id: 'leetcode', image: '/leetcode.png', href: 'https://leetcode.com/u/shriramthebeast/', label: 'LeetCode' },
    { id: 'codeforces', image: '/codeforces.jpg', href: 'https://codeforces.com/profile/Beast7878', label: 'Codeforces' },
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
      
      {dockItems.map(item => (
        <div 
          key={item.id}
          className="dock-icon"
          onClick={() => handleDockClick(item)}
          title={item.label}
          style={{ color: item.color }}
        >
          {item.icon ? (
            <item.icon size={24} />
          ) : (
            <img 
              src={item.image} 
              alt={item.label}
              className="w-6 h-6 object-contain"
            />
          )}
        </div>
      ))}
    </div>
  );
};
