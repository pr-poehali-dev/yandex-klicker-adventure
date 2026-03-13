import { useState } from 'react';
import { BOOSTS } from '@/data/gameData';
import Icon from '@/components/ui/icon';

interface Props {
  coins: number;
  getBoostTimeLeft: (id: string) => number;
  buyBoost: (id: string, cost: number, duration: number) => void;
  unlockBoostAd: (id: string, duration: number) => void;
}

export default function BoostersPage({ coins, getBoostTimeLeft, buyBoost, unlockBoostAd }: Props) {
  const [adLoading, setAdLoading] = useState<string | null>(null);
  const [shake, setShake] = useState<string | null>(null);

  const handleBuy = (boostId: string, cost: number, duration: number) => {
    if (coins < cost) {
      setShake(boostId);
      setTimeout(() => setShake(null), 600);
      return;
    }
    buyBoost(boostId, cost, duration);
  };

  const handleAd = (boostId: string, duration: number) => {
    setAdLoading(boostId);
    // Simulate ad viewing (Yandex Games SDK call goes here)
    setTimeout(() => {
      unlockBoostAd(boostId, duration);
      setAdLoading(null);
    }, 2500);
  };

  const formatTime = (secs: number) => {
    if (secs >= 60) return `${Math.floor(secs / 60)}м ${secs % 60}с`;
    return `${secs}с`;
  };

  return (
    <div className="px-4 py-3 space-y-3 pb-24">
      <div className="text-center mb-4">
        <h2 className="font-game text-2xl text-coin">Бустеры</h2>
        <p className="text-white/50 text-sm">Усиль своего робота!</p>
      </div>

      <div className="card-game mb-4 flex items-center justify-between">
        <span className="text-white/70 font-body text-sm">Твои монеты:</span>
        <span className="font-game text-xl text-coin">
          🪙 {coins.toLocaleString('ru')}
        </span>
      </div>

      {BOOSTS.map(boost => {
        const timeLeft = getBoostTimeLeft(boost.id);
        const isActive = timeLeft > 0;
        const canBuy = coins >= boost.cost && boost.cost > 0;
        const isShaking = shake === boost.id;
        const isLoadingAd = adLoading === boost.id;

        return (
          <div
            key={boost.id}
            className={`card-game transition-all duration-200 ${isActive ? 'border-2' : ''} ${isShaking ? '' : ''}`}
            style={{
              borderColor: isActive ? boost.color : 'transparent',
              boxShadow: isActive ? `0 0 20px ${boost.color}40` : 'none',
              animation: isShaking ? 'shake 0.5s ease-in-out' : 'none',
            }}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: `${boost.color}20`, border: `2px solid ${boost.color}50` }}
              >
                {boost.emoji}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-game text-lg text-white leading-none">{boost.name}</span>
                  {isActive && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full animate-pulse"
                      style={{ background: boost.color, color: '#000' }}
                    >
                      АКТИВЕН
                    </span>
                  )}
                </div>
                <p className="text-white/60 text-sm mt-0.5">{boost.description}</p>

                {isActive && (
                  <div className="mt-1 flex items-center gap-1 text-sm" style={{ color: boost.color }}>
                    <Icon name="Clock" size={14} />
                    <span className="font-bold">{formatTime(timeLeft)}</span>
                    <span className="text-white/40">осталось</span>
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-3 flex gap-2">
              {boost.adUnlock && (
                <button
                  className="game-btn flex-1 py-2.5 text-sm flex items-center justify-center gap-2"
                  style={{
                    background: isLoadingAd ? '#444' : 'linear-gradient(135deg, #4FC3F7, #0288D1)',
                    color: '#fff',
                    opacity: isLoadingAd ? 0.7 : 1,
                  }}
                  onClick={() => !isLoadingAd && handleAd(boost.id, boost.duration)}
                >
                  {isLoadingAd ? (
                    <>
                      <Icon name="Loader2" size={16} className="animate-spin" />
                      Смотрю рекламу...
                    </>
                  ) : (
                    <>
                      <Icon name="Play" size={16} />
                      Смотреть рекламу
                    </>
                  )}
                </button>
              )}

              {boost.cost > 0 && (
                <button
                  className="game-btn flex-1 py-2.5 text-sm flex items-center justify-center gap-2"
                  style={{
                    background: canBuy
                      ? `linear-gradient(135deg, ${boost.color}, ${boost.color}99)`
                      : 'rgba(255,255,255,0.1)',
                    color: canBuy ? '#000' : 'rgba(255,255,255,0.4)',
                    fontWeight: 700,
                  }}
                  onClick={() => handleBuy(boost.id, boost.cost, boost.duration)}
                >
                  🪙 {boost.cost.toLocaleString('ru')}
                  {!canBuy && <Icon name="Lock" size={14} />}
                </button>
              )}
            </div>
          </div>
        );
      })}

      <div className="card-game text-center py-3">
        <p className="text-white/40 text-xs">
          Просмотр рекламы помогает развитию игры 🙏
        </p>
      </div>
    </div>
  );
}
