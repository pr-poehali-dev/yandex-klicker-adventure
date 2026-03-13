import { useState, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useYandexGames } from '@/hooks/useYandexGames';
import ClickerScene from '@/components/game/ClickerScene';
import BoostersPage from '@/components/game/BoostersPage';
import AchievementsPage from '@/components/game/AchievementsPage';
import LeaderboardPage from '@/components/game/LeaderboardPage';
import AboutPage from '@/components/game/AboutPage';
import SkinsPage from '@/components/game/SkinsPage';
import AchievementToast from '@/components/game/AchievementToast';
import { SKINS } from '@/data/skins';

type Tab = 'game' | 'skins' | 'boosts' | 'achievements' | 'leaderboard';

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: 'game',         label: 'Игра',    emoji: '🎮' },
  { id: 'skins',        label: 'Скины',   emoji: '👗' },
  { id: 'boosts',       label: 'Магазин', emoji: '🛒' },
  { id: 'achievements', label: 'Ачивки',  emoji: '🏆' },
  { id: 'leaderboard',  label: 'Топ',     emoji: '👑' },
];

export default function Index() {
  const [tab, setTab] = useState<Tab>('game');
  const {
    state, handleClick, buyBoost, unlockBoostAd, setPlayerName,
    getActiveMultiplier, getBoostTimeLeft,
    selectSkin, buySkin, unlockSkinAd,
  } = useGameState();

  const { adStatus, showRewardedAd, showFullscreenAd, submitScore } = useYandexGames();

  const multiplier = getActiveMultiplier();
  const currentSkin = SKINS.find(s => s.id === state.currentSkinId) ?? SKINS[0];

  // Отправляем счёт в лидерборд при каждом клике (дебаунс 5с)
  useEffect(() => {
    const t = setTimeout(() => submitScore(state.totalClicks), 5000);
    return () => clearTimeout(t);
  }, [state.totalClicks, submitScore]);

  // Полноэкранная реклама при первом запуске
  useEffect(() => {
    const shown = sessionStorage.getItem('intro_ad_shown');
    if (!shown) {
      sessionStorage.setItem('intro_ad_shown', '1');
      setTimeout(() => showFullscreenAd(), 2000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Rewarded ad для бустеров */
  const handleBoostAd = (boostId: string, duration: number) => {
    showRewardedAd(
      () => unlockBoostAd(boostId, duration),
    );
  };

  /* Rewarded ad для скинов */
  const handleSkinAd = (skinId: string, onSuccess: () => void) => {
    showRewardedAd(() => {
      unlockSkinAd(skinId);
      onSuccess();
    });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0F1923' }}>

      {/* Pixel-grid bg */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(26,107,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(26,107,255,0.03) 1px,transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 py-2.5"
        style={{ background: '#0a0f1a', borderBottom: '2px solid #1C2333' }}>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            <div className="w-4 h-5 rounded-sm" style={{ background: '#E61919' }} />
            <div className="w-4 h-5 rounded-sm" style={{ background: '#1A6BFF' }} />
          </div>
          <span className="font-game text-xl text-white tracking-wide">НубоКлик</span>
          {/* Current skin badge */}
          <span className="text-lg ml-1">{currentSkin.emoji}</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 font-game text-base"
          style={{ background: '#1C2333', border: '2px solid #2D3A50', borderRadius: 4 }}>
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
            style={{ background: '#FFD700', color: '#111' }}>R$</div>
          <span style={{ color: '#FFD700' }}>{state.coins.toLocaleString('ru')}</span>
        </div>
      </header>

      {/* Active boosts */}
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
                <span>{emojis[ab.boostId] ?? '⚡'}</span><span>{t}с</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Ad status overlay */}
      {(adStatus === 'loading' || adStatus === 'showing') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.85)' }}>
          <div className="rblx-panel text-center px-8 py-6">
            <div className="text-4xl mb-3 animate-spin" style={{ animationDuration: '1s' }}>📺</div>
            <div className="font-game text-xl text-white">Загрузка рекламы...</div>
            <div className="text-sm font-bold mt-1" style={{ color: '#4a5768' }}>Досмотри до конца для получения бонуса!</div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 relative z-10 overflow-y-auto" style={{ paddingBottom: 72 }}>
        {tab === 'game' && (
          <div className="py-5">
            <ClickerScene coins={state.coins} totalClicks={state.totalClicks}
              clicksPerSecond={state.clicksPerSecond} multiplier={multiplier}
              skin={currentSkin} onClick={handleClick} />
          </div>
        )}
        {tab === 'skins' && (
          <SkinsPage
            coins={state.coins}
            currentSkinId={state.currentSkinId}
            unlockedSkins={state.unlockedSkins}
            onSelect={selectSkin}
            onBuy={(id, price) => buySkin(id, price)}
            onAdUnlock={handleSkinAd}
          />
        )}
        {tab === 'boosts' && (
          <BoostersPage coins={state.coins} adStatus={adStatus}
            getBoostTimeLeft={getBoostTimeLeft} buyBoost={buyBoost}
            onShowRewardedAd={handleBoostAd} />
        )}
        {tab === 'achievements' && (
          <AchievementsPage achievements={state.achievements}
            totalClicks={state.totalClicks} totalCoinsEarned={state.totalCoinsEarned} />
        )}
        {tab === 'leaderboard' && (
          <LeaderboardPage playerName={state.playerName}
            totalClicks={state.totalClicks} setPlayerName={setPlayerName} />
        )}
      </main>

      {/* Bottom nav */}
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
