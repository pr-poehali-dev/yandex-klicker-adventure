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
      setTimeout(() => setShake(null), 500);
      return;
    }
    buyBoost(boostId, cost, duration);
  };

  const handleAd = (boostId: string, duration: number) => {
    setAdLoading(boostId);
    setTimeout(() => { unlockBoostAd(boostId, duration); setAdLoading(null); }, 2500);
  };

  const formatTime = (s: number) => s >= 60 ? `${Math.floor(s/60)}м ${s%60}с` : `${s}с`;

  const BOOST_COLOR: Record<string, string> = {
    turbo: '#FFD700', mega: '#FF6BC8', rainbow: '#4FC3F7', star: '#00B06F', robot: '#FFB74D',
  };

  return (
    <div className="px-4 py-3 space-y-3 pb-6">
      {/* Title bar */}
      <div className="rblx-panel flex items-center gap-3">
        <span className="text-2xl">🛒</span>
        <div>
          <div className="font-game text-lg text-white leading-none">Магазин бустеров</div>
          <div className="text-xs font-bold tracking-wide mt-0.5" style={{ color: '#4a5768' }}>УСИЛЬ СВОЕГО НУБА</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 font-game text-base"
          style={{ background: '#0F1923', border: '2px solid #2D3A50', borderRadius: 4 }}>
          <div className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black"
            style={{ background: '#FFD700', color: '#111' }}>R$</div>
          <span style={{ color: '#FFD700' }}>{coins.toLocaleString('ru')}</span>
        </div>
      </div>

      {BOOSTS.map(boost => {
        const timeLeft = getBoostTimeLeft(boost.id);
        const isActive = timeLeft > 0;
        const canBuy = coins >= boost.cost && boost.cost > 0;
        const isLoading = adLoading === boost.id;
        const color = BOOST_COLOR[boost.id] ?? '#fff';

        return (
          <div
            key={boost.id}
            className="rblx-panel"
            style={{
              borderTopColor: isActive ? color : '#2D3A50',
              borderTopWidth: 3,
              animation: shake === boost.id ? 'shake 0.4s ease-in-out' : 'none',
            }}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center text-3xl flex-shrink-0 font-black"
                style={{ background: '#0F1923', border: `2px solid ${color}44`, borderRadius: 5 }}>
                {boost.emoji}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-game text-lg text-white leading-none">{boost.name}</span>
                  {isActive && (
                    <span className="text-xs font-black px-2 py-0.5 tracking-widest"
                      style={{ background: color, color: '#000', borderRadius: 3 }}>
                      АКТИВЕН
                    </span>
                  )}
                </div>
                <p className="text-sm mt-0.5 font-semibold" style={{ color: '#4a5768' }}>{boost.description}</p>
                {isActive && (
                  <div className="mt-1 flex items-center gap-1 text-sm font-bold" style={{ color }}>
                    <Icon name="Clock" size={13} />
                    {formatTime(timeLeft)} осталось
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-3 flex gap-2">
              {boost.adUnlock && (
                <button
                  className="rblx-btn rblx-btn-blue flex-1 text-sm py-2.5"
                  style={{ opacity: isLoading ? 0.7 : 1 }}
                  onClick={() => !isLoading && handleAd(boost.id, boost.duration)}
                >
                  {isLoading
                    ? <><Icon name="Loader2" size={15} className="animate-spin" /> Реклама...</>
                    : <><Icon name="Play" size={15} /> Смотреть рекламу</>
                  }
                </button>
              )}
              {boost.cost > 0 && (
                <button
                  className={`rblx-btn flex-1 text-sm py-2.5 ${canBuy ? 'rblx-btn-yellow' : 'rblx-btn-gray'}`}
                  onClick={() => handleBuy(boost.id, boost.cost, boost.duration)}
                >
                  🪙 {boost.cost.toLocaleString('ru')}
                  {!canBuy && <Icon name="Lock" size={13} />}
                </button>
              )}
            </div>
          </div>
        );
      })}

      <div className="rblx-panel text-center py-2">
        <p className="text-xs font-bold tracking-wide" style={{ color: '#2D3A50' }}>
          РЕКЛАМА ПОМОГАЕТ РАЗВИТИЮ ИГРЫ 🙏
        </p>
      </div>
    </div>
  );
}
