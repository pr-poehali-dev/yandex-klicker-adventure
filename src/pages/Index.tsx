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
  { id: 'game', label: 'Игра', emoji: '🎮' },
  { id: 'boosts', label: 'Бустеры', emoji: '⚡' },
  { id: 'achievements', label: 'Ачивки', emoji: '🏆' },
  { id: 'leaderboard', label: 'Топ', emoji: '👑' },
  { id: 'about', label: 'О игре', emoji: 'ℹ️' },
];

export default function Index() {
  const [tab, setTab] = useState<Tab>('game');
  const {
    state,
    handleClick,
    buyBoost,
    unlockBoostAd,
    setPlayerName,
    getActiveMultiplier,
    getBoostTimeLeft,
  } = useGameState();

  const multiplier = getActiveMultiplier();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(160deg, #0d0620 0%, #1a0635 40%, #0a1628 100%)',
      }}
    >
      {/* Floating bg blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[0,1,2,3,4,5].map((i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              left: `${[10, 70, 30, 85, 20, 60][i]}%`,
              top: `${[15, 10, 60, 50, 85, 75][i]}%`,
              background: ['#FFD700','#FF6BC8','#4FC3F7','#69F0AE','#FFB74D','#FF6BC8'][i],
              opacity: 0.08,
              animation: `bg-pulse ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header
        className="relative z-10 flex items-center justify-between px-4 pt-3 pb-2"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <span className="font-game text-xl text-white">РобоКлик</span>
        </div>
        <div
          className="flex items-center gap-2 px-4 py-1.5 rounded-2xl font-game text-lg"
          style={{
            background: 'rgba(255,215,0,0.12)',
            border: '1.5px solid rgba(255,215,0,0.35)',
            boxShadow: '0 0 20px rgba(255,215,0,0.2)',
          }}
        >
          <span>🪙</span>
          <span className="text-coin">{state.coins.toLocaleString('ru')}</span>
        </div>
      </header>

      {/* Active boosts strip */}
      {state.activeBoosts.length > 0 && (
        <div className="relative z-10 flex gap-2 px-4 py-1.5 overflow-x-auto">
          {state.activeBoosts.map(ab => {
            const timeLeft = getBoostTimeLeft(ab.boostId);
            if (timeLeft <= 0) return null;
            const emojis: Record<string, string> = { turbo: '⚡', mega: '🚀', rainbow: '🌈', star: '⭐', robot: '🤖' };
            return (
              <div
                key={ab.boostId}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-xl text-sm font-bold"
                style={{
                  background: 'rgba(255,215,0,0.15)',
                  border: '1px solid rgba(255,215,0,0.4)',
                  color: '#FFD700',
                  animation: 'pulse-glow 2s ease-in-out infinite',
                }}
              >
                <span>{emojis[ab.boostId] || '⚡'}</span>
                <span>{timeLeft}с</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 relative z-10 overflow-y-auto" style={{ paddingBottom: '70px' }}>
        {tab === 'game' && (
          <div className="py-4">
            <ClickerScene
              coins={state.coins}
              totalClicks={state.totalClicks}
              clicksPerSecond={state.clicksPerSecond}
              multiplier={multiplier}
              onClick={handleClick}
            />
          </div>
        )}
        {tab === 'boosts' && (
          <BoostersPage
            coins={state.coins}
            getBoostTimeLeft={getBoostTimeLeft}
            buyBoost={buyBoost}
            unlockBoostAd={unlockBoostAd}
          />
        )}
        {tab === 'achievements' && (
          <AchievementsPage
            achievements={state.achievements}
            totalClicks={state.totalClicks}
            totalCoinsEarned={state.totalCoinsEarned}
          />
        )}
        {tab === 'leaderboard' && (
          <LeaderboardPage
            playerName={state.playerName}
            totalClicks={state.totalClicks}
            setPlayerName={setPlayerName}
          />
        )}
        {tab === 'about' && <AboutPage />}
      </main>

      {/* Bottom navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-around py-2"
        style={{
          background: 'rgba(8,3,20,0.97)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {TABS.map(t => (
          <button
            key={t.id}
            className={`nav-btn ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            <span className="text-xl leading-none">{t.emoji}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      {/* Achievement toast */}
      <AchievementToast achievements={state.achievements} />
    </div>
  );
}
