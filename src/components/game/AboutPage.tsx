export default function AboutPage() {
  return (
    <div className="px-4 py-3 pb-24 space-y-4">
      <div className="text-center mb-4">
        <h2 className="font-game text-2xl text-coin">О игре</h2>
        <p className="text-white/50 text-sm">РобоКлик — нажимай и побеждай!</p>
      </div>

      {/* How to play */}
      <div className="card-game">
        <h3 className="font-game text-lg text-boost-blue mb-3">🎮 Как играть?</h3>
        <div className="space-y-2.5">
          {[
            { icon: '👆', text: 'Нажимай на робота как можно быстрее' },
            { icon: '🪙', text: 'За каждый клик получай монеты' },
            { icon: '⚡', text: 'Покупай бустеры для умножения монет' },
            { icon: '📺', text: 'Смотри рекламу чтобы получить бонус x10!' },
            { icon: '🏆', text: 'Выполняй достижения и получай награды' },
            { icon: '👑', text: 'Стань лучшим в таблице лидеров!' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <span className="text-xl w-8 text-center flex-shrink-0">{icon}</span>
              <span className="text-sm text-white/70">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Boosters guide */}
      <div className="card-game">
        <h3 className="font-game text-lg text-boost-pink mb-3">⚡ Бустеры</h3>
        <div className="space-y-2">
          {[
            { emoji: '⚡', name: 'Турбо-клик', desc: 'x3 монеты на 30 секунд — 500 монет' },
            { emoji: '🚀', name: 'МЕГА-клик', desc: 'x5 монеты на 20 секунд — 1200 монет' },
            { emoji: '🌈', name: 'Радуга', desc: 'x2 монеты + авто-клик — 800 монет' },
            { emoji: '⭐', name: 'Звёздный бонус', desc: 'x10 монеты за просмотр рекламы!' },
            { emoji: '🤖', name: 'Авто-робот', desc: 'Кликает сам 60 секунд — 2000 монет' },
          ].map(({ emoji, name, desc }) => (
            <div key={name} className="flex gap-2 items-start">
              <span className="text-xl flex-shrink-0">{emoji}</span>
              <div>
                <span className="font-bold text-white text-sm">{name}: </span>
                <span className="text-white/60 text-sm">{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Developer */}
      <div className="card-game">
        <h3 className="font-game text-lg text-boost-green mb-2">👾 Разработчик</h3>
        <p className="text-white/60 text-sm leading-relaxed">
          РобоКлик создан с любовью для всех, кто любит нажимать кнопки!
          Игра постоянно обновляется — впереди новые бустеры, персонажи и приключения.
        </p>
        <div className="mt-3 flex gap-2 flex-wrap">
          {['🤖 Роботы', '⭐ Звёзды', '🎮 Игры', '🚀 Полёты'].map(tag => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(105,240,174,0.15)', color: '#69F0AE' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Version */}
      <div className="text-center py-2">
        <p className="text-white/20 text-xs">РобоКлик v1.0 • 2026</p>
        <p className="text-white/20 text-xs">Все монеты виртуальные 🪙</p>
      </div>
    </div>
  );
}
