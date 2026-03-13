import { useState, useCallback, useRef } from 'react';
import Icon from '@/components/ui/icon';

const ROBOT_IMG = 'https://cdn.poehali.dev/projects/8908f6bc-a84f-4d41-836a-c95d7da5738b/files/123cdef9-e17a-4139-be0f-5dad236f782f.jpg';

interface CoinParticle {
  id: number;
  x: number;
  y: number;
}

interface Props {
  coins: number;
  totalClicks: number;
  clicksPerSecond: number;
  multiplier: number;
  onClick: () => void;
}

export default function ClickerScene({ coins, totalClicks, clicksPerSecond, multiplier, onClick }: Props) {
  const [particles, setParticles] = useState<CoinParticle[]>([]);
  const [isClicking, setIsClicking] = useState(false);
  const particleId = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const formatCoins = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}М`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}К`;
    return n.toString();
  };

  const handleClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();

    const rect = containerRef.current?.getBoundingClientRect();
    let x = 50, y = 50;
    if (rect) {
      const clientX = 'touches' in e ? e.touches[0]?.clientX ?? rect.left + rect.width / 2 : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY ?? rect.top + rect.height / 2 : e.clientY;
      x = ((clientX - rect.left) / rect.width) * 100;
      y = ((clientY - rect.top) / rect.height) * 100;
    }

    const id = particleId.current++;
    setParticles(p => [...p, { id, x, y }]);
    setTimeout(() => setParticles(p => p.filter(pp => pp.id !== id)), 800);

    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 180);

    onClick();
  }, [onClick]);

  return (
    <div className="flex flex-col items-center gap-4 px-4 pt-2">
      {/* Stats bar */}
      <div className="w-full max-w-sm grid grid-cols-3 gap-2">
        <div className="card-game text-center">
          <div className="text-xs text-white/50 mb-1">Монеты</div>
          <div className="text-coin font-game text-xl leading-none">{formatCoins(coins)}</div>
        </div>
        <div className="card-game text-center">
          <div className="text-xs text-white/50 mb-1">Кликов</div>
          <div className="text-white font-game text-xl leading-none">{formatCoins(totalClicks)}</div>
        </div>
        <div className="card-game text-center">
          <div className="text-xs text-white/50 mb-1">КЛ/сек</div>
          <div className="text-boost-green font-game text-xl leading-none">{clicksPerSecond}</div>
        </div>
      </div>

      {/* Multiplier badge */}
      {multiplier > 1 && (
        <div className="animate-rainbow rounded-full px-5 py-1.5 font-game text-lg text-white shadow-lg animate-bounce-in">
          ✨ x{multiplier} бонус активен!
        </div>
      )}

      {/* Click area */}
      <div
        ref={containerRef}
        className="relative w-64 h-64 cursor-pointer select-none touch-none"
        onClick={handleClick}
        onTouchStart={handleClick}
      >
        {/* Glow ring */}
        <div className={`absolute inset-0 rounded-full transition-all duration-150 ${isClicking ? 'scale-110' : 'scale-100'}`}
          style={{
            background: 'radial-gradient(circle, rgba(255,215,0,0.25) 0%, transparent 70%)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}
        />

        {/* Robot */}
        <div
          className={`absolute inset-4 rounded-full overflow-hidden border-4 border-coin/60 shadow-2xl transition-all duration-150 ${isClicking ? 'scale-90 brightness-150' : 'scale-100'}`}
          style={{
            animation: isClicking ? 'none' : 'float 3s ease-in-out infinite',
            boxShadow: isClicking
              ? '0 0 50px rgba(255,215,0,0.8), 0 0 100px rgba(255,215,0,0.4)'
              : '0 0 30px rgba(255,215,0,0.4)',
          }}
        >
          <img
            src={ROBOT_IMG}
            alt="РобоКлик"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Coin particles */}
        {particles.map(p => (
          <span
            key={p.id}
            className="coin-float"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            {multiplier >= 5 ? '💎' : multiplier >= 3 ? '⭐' : '🪙'}
          </span>
        ))}

        {/* Click hint */}
        {totalClicks === 0 && (
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-sm font-body animate-bounce whitespace-nowrap flex items-center gap-1">
            <Icon name="MousePointerClick" size={16} />
            Нажимай на робота!
          </div>
        )}
      </div>

      {/* Tap button for mobile */}
      <button
        className="game-btn mt-6 px-10 py-4 text-2xl font-game"
        style={{
          background: 'linear-gradient(135deg, #FFD700, #FF8C00)',
          color: '#1a0a00',
          minWidth: 220,
        }}
        onClick={handleClick}
        onTouchStart={handleClick}
      >
        🪙 ТЫК! +{multiplier}
      </button>
    </div>
  );
}
