import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FolderOpen,
  Award,
  Calendar,
  Code,
  GraduationCap,
  User,
  type LucideIcon,
} from 'lucide-react';

interface LaunchpadExternalItem {
  id: string;
  title: string;
  image: string;
  href: string;
  kind: 'external';
}

interface LaunchpadAppItem {
  id: string;
  title: string;
  icon: LucideIcon;
  iconColor: string;
  kind: 'app';
}

type LaunchpadItem = LaunchpadExternalItem | LaunchpadAppItem;

interface LaunchpadProps {
  onClose: () => void;
  onOpenApp?: (appId: string, title: string) => void;
}

const launchpadItems: LaunchpadItem[] = [
  // Portfolio apps
  { id: 'projects', title: 'Projects', icon: FolderOpen, iconColor: '#f97316', kind: 'app' },
  { id: 'certifications', title: 'Certifications', icon: Award, iconColor: '#eab308', kind: 'app' },
  { id: 'involvements', title: 'Involvements', icon: Calendar, iconColor: '#6366f1', kind: 'app' },
  { id: 'skills', title: 'Skills', icon: Code, iconColor: '#3b82f6', kind: 'app' },
  { id: 'education', title: 'Education', icon: GraduationCap, iconColor: '#22c55e', kind: 'app' },
  { id: 'about', title: 'About Me', icon: User, iconColor: '#ef4444', kind: 'app' },
  // External links
  { id: 'github', title: 'GitHub', image: '/github.png', href: 'https://github.com/BEASTSHRIRAM', kind: 'external' },
  { id: 'linkedin', title: 'LinkedIn', image: '/linkedin.png', href: 'https://linkedin.com/in/sriramkulkarni7878', kind: 'external' },
  { id: 'email', title: 'Email', image: '/gmail.png', href: 'mailto:shrikulk20@gmail.com', kind: 'external' },
  { id: 'resume', title: 'Resume', image: '/resumelogo.png', href: 'https://drive.google.com/file/d/1Ke74lav-fygrM6Y0fVgRN9SUKHIW2dC-/view?usp=sharing', kind: 'external' },
  { id: 'leetcode', title: 'LeetCode', image: '/leetcode.png', href: 'https://leetcode.com/u/shriramthebeast/', kind: 'external' },
  { id: 'codeforces', title: 'Codeforces', image: '/codeforces.jpg', href: 'https://codeforces.com/profile/Beast7878', kind: 'external' },
];

export const Launchpad = ({ onClose, onOpenApp }: LaunchpadProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const launchpadRef = useRef<HTMLDivElement>(null);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filteredItems = launchpadItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemClick = (item: LaunchpadItem) => {
    if (item.kind === 'external') {
      window.open(item.href, '_blank');
    } else if (onOpenApp) {
      onOpenApp(item.id, item.title);
    }
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-2xl flex items-start justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        ref={launchpadRef}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center pt-20 w-full max-h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="w-64 mb-10">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-8 px-4 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 text-sm outline-none focus:bg-white/30 transition-colors"
          />
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-8 px-10 max-w-5xl pb-20">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => handleItemClick(item)}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white/10 shadow-lg group-hover:scale-110 transition-transform duration-200 flex items-center justify-center">
                {item.kind === 'external' ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <item.icon size={36} style={{ color: item.iconColor }} />
                )}
              </div>
              <span className="mt-2 text-white text-xs sm:text-sm text-center truncate max-w-[80px]">
                {item.title}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Close hint */}
        <div className="text-white/40 text-sm pb-10">
          Click outside or press ESC to close
        </div>
      </motion.div>
    </motion.div>
  );
};
