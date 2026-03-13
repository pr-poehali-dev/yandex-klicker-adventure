import { useState } from 'react';
import { LEADERBOARD } from '@/data/gameData';
import Icon from '@/components/ui/icon';

interface Props {
  playerName: string;
  totalClicks: number;
  setPlayerName: (name: string) => void;
}

export default function LeaderboardPage({ playerName, totalClicks, setPlayerName }: Props) {
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(playerName);

  const saveName = () => {
    const trimmed = nameInput.trim();
    if (trimmed.length >= 2) {
      setPlayerName(trimmed);
    }
    setEditing(false);
  };

  const playerRank = LEADERBOARD.findIndex(e => totalClicks > e.score);
  const displayRank = playerRank === -1 ? LEADERBOARD.length + 1 : playerRank + 1;

  const allEntries = [
    ...LEADERBOARD,
    { rank: LEADERBOARD.length + 1, name: playerName, score: totalClicks, emoji: '🌟' },
  ].sort((a, b) => b.score - a.score).slice(0, 12);

  return (
    <div className="px-4 py-3 pb-24">
      <div className="text-center mb-4">
        <h2 className="font-game text-2xl text-coin">Таблица лидеров</h2>
        <p className="text-white/50 text-sm">Лучшие кликеры мира!</p>
      </div>

      {/* Player card */}
      <div
        className="card-game mb-4"
        style={{
          border: '2px solid rgba(255,215,0,0.5)',
          boxShadow: '0 0 20px rgba(255,215,0,0.2)',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-coin/20 flex items-center justify-center text-2xl">
            🌟
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-white/10 rounded-xl px-3 py-1.5 text-white font-body text-sm outline-none border border-white/20 focus:border-coin"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveName()}
                  maxLength={16}
                  autoFocus
                />
                <button
                  className="game-btn px-3 py-1.5 text-sm"
                  style={{ background: '#FFD700', color: '#000' }}
                  onClick={saveName}
                >
                  <Icon name="Check" size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-game text-white text-lg">{playerName}</span>
                <button onClick={() => setEditing(true)} className="text-white/40 hover:text-white/80 transition-colors">
                  <Icon name="Pencil" size={14} />
                </button>
              </div>
            )}
            <div className="text-xs text-white/50 mt-0.5">
              🪙 {totalClicks.toLocaleString('ru')} кликов
            </div>
          </div>
          <div className="text-right">
            <div className="font-game text-2xl text-coin">#{displayRank}</div>
            <div className="text-xs text-white/40">место</div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="space-y-2">
        {allEntries.map((entry, idx) => {
          const isPlayer = entry.name === playerName && entry.score === totalClicks;
          const rank = idx + 1;
          const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : null;

          return (
            <div
              key={`${entry.name}-${entry.score}`}
              className={`card-game flex items-center gap-3 transition-all ${isPlayer ? 'border-2 border-coin/40' : ''}`}
              style={{
                boxShadow: isPlayer ? '0 0 15px rgba(255,215,0,0.15)' : 'none',
                background: isPlayer ? 'rgba(255,215,0,0.08)' : undefined,
              }}
            >
              <div className="w-9 text-center font-game text-xl flex-shrink-0">
                {medal || <span className="text-white/30 text-base">#{rank}</span>}
              </div>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{
                  background: rank <= 3
                    ? `linear-gradient(135deg, ${['#FFD700','#C0C0C0','#CD7F32'][rank-1]}, ${['#FF8C00','#888','#8B4513'][rank-1]})`
                    : 'rgba(255,255,255,0.08)',
                }}
              >
                {entry.emoji || '🏅'}
              </div>
              <div className="flex-1">
                <div className={`font-game text-base ${isPlayer ? 'text-coin' : 'text-white'}`}>
                  {entry.name}
                  {isPlayer && <span className="text-xs text-white/60 ml-2">(ты)</span>}
                </div>
              </div>
              <div className="text-right">
                <div className="font-game text-base text-white">{entry.score.toLocaleString('ru')}</div>
                <div className="text-xs text-white/40">кликов</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
