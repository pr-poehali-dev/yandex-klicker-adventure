import { useEffect, useState } from 'react';
import type { Achievement } from '@/types/game';

interface Props { achievements: Achievement[]; }

export default function AchievementToast({ achievements }: Props) {
  const [shown, setShown] = useState<Set<string>>(new Set());
  const [current, setCurrent] = useState<Achievement | null>(null);

  useEffect(() => {
    const newlyUnlocked = achievements.find(a => a.unlocked && !shown.has(a.id));
    if (newlyUnlocked && !current) {
      setShown(s => new Set([...s, newlyUnlocked.id]));
      setCurrent(newlyUnlocked);
      setTimeout(() => setCurrent(null), 3200);
    }
  }, [achievements, shown, current]);

  if (!current) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce-in"
      style={{ maxWidth: 320, width: 'calc(100% - 32px)' }}>
      <div className="flex items-center gap-3 px-5 py-4"
        style={{
          background: '#1C2333',
          border: '3px solid #FFD700',
          borderRadius: 6,
          boxShadow: '0 6px 0 #9a8200, 0 0 30px rgba(255,215,0,0.35)',
        }}>
        {/* Left accent */}
        <div className="w-1.5 self-stretch rounded-full flex-shrink-0" style={{ background: '#FFD700' }} />
        <span className="text-3xl">{current.emoji}</span>
        <div>
          <div className="text-xs font-black tracking-widest mb-0.5" style={{ color: '#FFD700' }}>
            ДОСТИЖЕНИЕ!
          </div>
          <div className="font-game text-base text-white leading-none">{current.name}</div>
          <div className="text-xs font-bold mt-0.5" style={{ color: '#4a5768' }}>Награда: +{current.reward} 🪙</div>
        </div>
      </div>
    </div>
  );
}
