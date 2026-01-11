import React from "react";

interface MenuItemProps {
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
  children: React.ReactNode;
}

interface MenuItemGroupProps {
  border?: boolean;
  children: React.ReactNode;
}

export const MenuItem = ({ onClick, children }: MenuItemProps) => {
  return (
    <li
      onClick={onClick}
      className="leading-6 cursor-default px-2.5 rounded hover:text-white hover:bg-blue-500 transition-colors"
    >
      {children}
    </li>
  );
};

export const MenuItemGroup = ({ border = true, children }: MenuItemGroupProps) => {
  return (
    <ul className={`relative px-1 pt-1 ${border ? 'pb-1 border-b border-white/20' : 'pb-1'}`}>
      {children}
    </ul>
  );
};
