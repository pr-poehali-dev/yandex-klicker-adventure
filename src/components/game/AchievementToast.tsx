import { useEffect, useState } from 'react';
import type { Achievement } from '@/types/game';

interface Props {
  achievements: Achievement[];
}

export default function AchievementToast({ achievements }: Props) {
  const [shown, setShown] = useState<Set<string>>(new Set());
  const [current, setCurrent] = useState<Achievement | null>(null);

  useEffect(() => {
    const newlyUnlocked = achievements.find(a => a.unlocked && !shown.has(a.id));
    if (newlyUnlocked && !current) {
      setShown(s => new Set([...s, newlyUnlocked.id]));
      setCurrent(newlyUnlocked);
      setTimeout(() => setCurrent(null), 3000);
    }
  }, [achievements, shown, current]);

  if (!current) return null;

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce-in"
      style={{ maxWidth: 320, width: 'calc(100% - 32px)' }}
    >
      <div
        className="rounded-2xl px-5 py-4 flex items-center gap-3 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,215,0,0.95), rgba(255,140,0,0.95))',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 30px rgba(255,215,0,0.5)',
        }}
      >
        <span className="text-4xl animate-spin" style={{ animationDuration: '2s' }}>{current.emoji}</span>
        <div>
          <div className="font-game text-lg text-black leading-none">Достижение!</div>
          <div className="font-bold text-black/80 text-sm">{current.name}</div>
          <div className="text-black/60 text-xs mt-0.5">+{current.reward} 🪙</div>
        </div>
      </div>
    </div>
  );
}
