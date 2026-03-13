import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import ClickerScene from '@/components/game/ClickerScene';
import BoostersPage from '@/components/game/BoostersPage';
import AchievementsPage from '@/components/game/AchievementsPage';
import LeaderboardPage from '@/components/game/LeaderboardPage';
import AboutPage from '@/components/game/AboutPage';
import AchievementToast from '@/components/game/AchievementToast';

type Tab = 'game' | 'boosts' | 'achievements' | 'leaderboard' | 'about';

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: 'game',         label: 'Игра',    emoji: '🎮' },
  { id: 'boosts',       label: 'Магазин', emoji: '🛒' },
  { id: 'achievements', label: 'Ачивки',  emoji: '🏆' },
  { id: 'leaderboard',  label: 'Топ',     emoji: '👑' },
  { id: 'about',        label: 'Инфо',    emoji: 'ℹ️' },
];

export default function Index() {
  const [tab, setTab] = useState<Tab>('game');
  const { state, handleClick, buyBoost, unlockBoostAd, setPlayerName, getActiveMultiplier, getBoostTimeLeft } = useGameState();
  const multiplier = getActiveMultiplier();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0F1923' }}>

      {/* Pixel-grid background */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(26,107,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,107,255,0.03) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Header — Roblox top bar */}
      <header className="relative z-10 flex items-center justify-between px-4 py-2.5"
        style={{ background: '#0a0f1a', borderBottom: '2px solid #1C2333' }}>
        <div className="flex items-center gap-2">
          {/* Roblox-style logo block */}
          <div className="flex gap-0.5">
            <div className="w-4 h-5 rounded-sm" style={{ background: '#E61919' }} />
            <div className="w-4 h-5 rounded-sm" style={{ background: '#1A6BFF' }} />
          </div>
          <span className="font-game text-xl text-white tracking-wide">НубоКлик</span>
        </div>

        {/* Balance */}
        <div className="flex items-center gap-2 px-3 py-1.5 font-game text-base"
          style={{ background: '#1C2333', border: '2px solid #2D3A50', borderRadius: 4 }}>
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
            style={{ background: '#FFD700', color: '#111' }}>R$</div>
          <span style={{ color: '#FFD700' }}>{state.coins.toLocaleString('ru')}</span>
        </div>
      </header>

      {/* Active boosts bar */}
      {state.activeBoosts.length > 0 && (
        <div className="relative z-10 flex gap-2 px-4 py-1.5 overflow-x-auto"
          style={{ background: '#0d131e', borderBottom: '1px solid #1C2333' }}>
          {state.activeBoosts.map(ab => {
            const t = getBoostTimeLeft(ab.boostId);
            if (t <= 0) return null;
            const emojis: Record<string,string> = { turbo:'⚡', mega:'🚀', rainbow:'🌈', star:'⭐', robot:'🤖' };
            return (
              <div key={ab.boostId} className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1 font-bold text-sm"
                style={{ background: '#E61919', borderRadius: 3, color: '#fff', boxShadow: '0 2px 0 #8f0e0e' }}>
                <span>{emojis[ab.boostId] || '⚡'}</span>
                <span>{t}с</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Main */}
      <main className="flex-1 relative z-10 overflow-y-auto" style={{ paddingBottom: 72 }}>
        {tab === 'game' && (
          <div className="py-5">
            <ClickerScene coins={state.coins} totalClicks={state.totalClicks}
              clicksPerSecond={state.clicksPerSecond} multiplier={multiplier} onClick={handleClick} />
          </div>
        )}
        {tab === 'boosts' && (
          <BoostersPage coins={state.coins} getBoostTimeLeft={getBoostTimeLeft}
            buyBoost={buyBoost} unlockBoostAd={unlockBoostAd} />
        )}
        {tab === 'achievements' && (
          <AchievementsPage achievements={state.achievements}
            totalClicks={state.totalClicks} totalCoinsEarned={state.totalCoinsEarned} />
        )}
        {tab === 'leaderboard' && (
          <LeaderboardPage playerName={state.playerName}
            totalClicks={state.totalClicks} setPlayerName={setPlayerName} />
        )}
        {tab === 'about' && <AboutPage />}
      </main>

      {/* Bottom nav — Roblox sidebar style */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-around py-2 px-1"
        style={{ background: '#0a0f1a', borderTop: '2px solid #1C2333' }}>
        {TABS.map(t => (
          <button key={t.id} className={`nav-btn ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            <span className="text-xl leading-none">{t.emoji}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      <AchievementToast achievements={state.achievements} />
    </div>
  );
}
