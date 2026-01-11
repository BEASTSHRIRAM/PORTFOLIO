import React, { useRef } from "react";
import { MenuItem, MenuItemGroup } from "./MenuItem";
import { useClickOutside } from "../../hooks/useClickOutside";

interface AppleMenuProps {
  onAbout: () => void;
  onSleep: () => void;
  onRestart: () => void;
  onShutDown: () => void;
  onLockScreen: () => void;
  toggleAppleMenu: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
}

export default function AppleMenu({
  onAbout,
  onSleep,
  onRestart,
  onShutDown,
  onLockScreen,
  toggleAppleMenu,
  btnRef
}: AppleMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, toggleAppleMenu, [btnRef as React.RefObject<HTMLElement>]);

  return (
    <div 
      className="fixed top-9 left-2 w-56 bg-black/70 backdrop-blur-2xl border border-white/20 rounded-lg shadow-xl text-white text-sm z-[60]"
      ref={ref}
    >
      <MenuItemGroup>
        <MenuItem onClick={onAbout}>About This Mac</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem>System Preferences...</MenuItem>
        <MenuItem>App Store...</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem>Recent Items</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem>Force Quit...</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem onClick={onSleep}>Sleep</MenuItem>
        <MenuItem onClick={onRestart}>Restart...</MenuItem>
        <MenuItem onClick={onShutDown}>Shut Down...</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup border={false}>
        <MenuItem onClick={onLockScreen}>Lock Screen</MenuItem>
        <MenuItem onClick={onLockScreen}>Log Out Sriram Kulkarni...</MenuItem>
      </MenuItemGroup>
    </div>
  );
}
