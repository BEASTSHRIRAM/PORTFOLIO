import { useEffect, RefObject } from 'react';

export function useClickOutside(
  ref: RefObject<HTMLElement>,
  callback: () => void,
  excludeRefs: RefObject<HTMLElement>[] = []
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Check if click is inside the main ref
      if (ref.current && ref.current.contains(e.target as Node)) {
        return;
      }
      
      // Check if click is inside any excluded refs
      for (const excludeRef of excludeRefs) {
        if (excludeRef.current && excludeRef.current.contains(e.target as Node)) {
          return;
        }
      }
      
      callback();
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback, excludeRefs]);
}
