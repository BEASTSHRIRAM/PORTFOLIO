import React from 'react';
import { MapPin } from 'lucide-react';

export const InvolvementsApp = () => {
  return (
    <div className="h-full p-6">
      <h2 className="text-2xl font-bold mb-4">Involvements</h2>

      <div className="glass-bg p-4 rounded-lg mb-6">
        <p className="mb-2">My involvements (hackathons, conferences) will appear here.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded">Event 1</div>
          <div className="p-4 bg-muted rounded">Event 2</div>
        </div>
      </div>

      <div className="opacity-80">
        <p>I'll Update soon.</p>
      </div>
    </div>
  );
};

export default InvolvementsApp;
