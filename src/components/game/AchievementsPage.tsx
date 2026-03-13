import type { Achievement } from '@/types/game';

interface Props {
  achievements: Achievement[];
  totalClicks: number;
  totalCoinsEarned: number;
}

export default function AchievementsPage({ achievements, totalClicks, totalCoinsEarned }: Props) {
  const unlocked = achievements.filter(a => a.unlocked).length;

  return (
    <div className="px-4 py-3 space-y-3 pb-24">
      <div className="text-center mb-4">
        <h2 className="font-game text-2xl text-coin">Достижения</h2>
        <p className="text-white/50 text-sm">{unlocked} из {achievements.length} открыто</p>
      </div>

      {/* Progress bar */}
      <div className="card-game">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/60">Прогресс</span>
          <span className="text-coin font-bold">{unlocked}/{achievements.length}</span>
        </div>
        <div className="h-4 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(unlocked / achievements.length) * 100}%`,
              background: 'linear-gradient(90deg, #FFD700, #FF6BC8)',
              boxShadow: '0 0 10px rgba(255,215,0,0.5)',
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="card-game text-center py-3">
          <div className="text-3xl mb-1">👆</div>
          <div className="font-game text-xl text-white">{totalClicks.toLocaleString('ru')}</div>
          <div className="text-xs text-white/50">всего кликов</div>
        </div>
        <div className="card-game text-center py-3">
          <div className="text-3xl mb-1">🪙</div>
          <div className="font-game text-xl text-coin">{totalCoinsEarned.toLocaleString('ru')}</div>
          <div className="text-xs text-white/50">монет заработано</div>
        </div>
      </div>

      {/* Achievement list */}
      <div className="space-y-2">
        {achievements.map((a) => (
          <div
            key={a.id}
            className={`card-game flex items-center gap-3 transition-all duration-300 ${a.unlocked ? '' : 'opacity-50'}`}
            style={{
              borderColor: a.unlocked ? 'rgba(255,215,0,0.4)' : 'transparent',
              border: a.unlocked ? '2px solid rgba(255,215,0,0.4)' : '2px solid transparent',
              boxShadow: a.unlocked ? '0 0 15px rgba(255,215,0,0.15)' : 'none',
            }}
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${a.unlocked ? 'animate-bounce-in' : ''}`}
              style={{
                background: a.unlocked ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.05)',
                filter: a.unlocked ? 'none' : 'grayscale(1)',
              }}
            >
              {a.unlocked ? a.emoji : '🔒'}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`font-game text-base ${a.unlocked ? 'text-white' : 'text-white/50'}`}>
                  {a.name}
                </span>
                {a.unlocked && (
                  <span className="text-xs bg-coin/20 text-coin px-2 py-0.5 rounded-full font-bold">
                    +{a.reward} 🪙
                  </span>
                )}
              </div>
              <p className="text-xs text-white/40 mt-0.5">{a.description}</p>
              {!a.unlocked && a.requirement > 0 && (
                <div className="mt-1.5">
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.1)' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(100, (totalClicks / a.requirement) * 100)}%`,
                        background: 'linear-gradient(90deg, #4FC3F7, #69F0AE)',
                      }}
                    />
                  </div>
                  <div className="text-xs text-white/30 mt-0.5">
                    {Math.min(totalClicks, a.requirement)} / {a.requirement}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
