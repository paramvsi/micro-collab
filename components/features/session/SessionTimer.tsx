'use client';

/**
 * SessionTimer Component
 * Displays elapsed time for active sessions
 */

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface SessionTimerProps {
  startTime: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
}

export function SessionTimer({ startTime, status }: SessionTimerProps) {
  const [elapsedTime, setElapsedTime] = useState('00:00:00');

  useEffect(() => {
    if (status !== 'active') {
      return;
    }

    const updateTimer = () => {
      const start = new Date(startTime).getTime();
      const now = Date.now();
      const diff = Math.floor((now - start) / 1000);

      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      const formatted = [hours, minutes, seconds]
        .map((n) => n.toString().padStart(2, '0'))
        .join(':');

      setElapsedTime(formatted);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [startTime, status]);

  if (status !== 'active') {
    return null;
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-card/80 border border-brand-purple/30">
      <Clock className="h-4 w-4 text-brand-cyan" />
      <span className="text-sm font-mono font-medium text-white tabular-nums">
        {elapsedTime}
      </span>
    </div>
  );
}
