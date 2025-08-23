import { LucideIcon } from 'lucide-react';

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  colorClass?: string;
}

export const DesktopIcon = ({ icon: Icon, label, onClick, colorClass }: DesktopIconProps) => {
  return (
    <div className="desktop-icon" onClick={onClick}>
      <Icon size={48} className={`mb-3 ${colorClass || 'text-foreground'}`} />
      <span className="text-sm font-medium text-center">{label}</span>
    </div>
  );
};