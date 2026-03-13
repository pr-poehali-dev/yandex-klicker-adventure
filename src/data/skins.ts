export interface Skin {
  id: string;
  name: string;
  tag: string;
  emoji: string;
  description: string;
  price: number;       // 0 = бесплатно, -1 = за рекламу
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  img: string;
  borderColor: string;
  glowColor: string;
}

export const SKINS: Skin[] = [
  // ── COMMON ──────────────────────────────────────────────────────────────────
  {
    id: 'noob',
    name: 'Нуб',
    tag: 'Noob_1337',
    emoji: '😅',
    description: 'Классический нуб. С него всё начинается!',
    price: 0,
    rarity: 'common',
    img: 'https://cdn.poehali.dev/projects/8908f6bc-a84f-4d41-836a-c95d7da5738b/files/b78e2fb0-bd47-4400-be18-8ed943c6f323.jpg',
    borderColor: '#4a5568',
    glowColor: 'rgba(74,85,104,0.4)',
  },
  {
    id: 'alien',
    name: 'Пришелец',
    tag: 'UFO_Invader',
    emoji: '👽',
    description: 'Прилетел из другой галактики кликать! (за рекламу)',
    price: -1,
    rarity: 'rare',
    img: 'https://cdn.poehali.dev/projects/8908f6bc-a84f-4d41-836a-c95d7da5738b/files/2be48b00-b24d-45c2-b2d5-e93a187a13a1.jpg',
    borderColor: '#00B06F',
    glowColor: 'rgba(0,176,111,0.4)',
  },

  // ── RARE ────────────────────────────────────────────────────────────────────
  {
    id: 'ninja',
    name: 'Ниндзя',
    tag: 'ShadowKiller_X',
    emoji: '🥷',
    description: 'Быстрый и бесшумный. Кликает как ветер!',
    price: 10_000,
    rarity: 'rare',
    img: 'https://cdn.poehali.dev/projects/8908f6bc-a84f-4d41-836a-c95d7da5738b/files/e534bc50-be8e-48ac-82b2-80c9efd98b95.jpg',
    borderColor: '#E61919',
    glowColor: 'rgba(230,25,25,0.4)',
  },
  {
    id: 'cowboy',
    name: 'Ковбой',
    tag: 'WildWest_Click',
    emoji: '🤠',
    description: 'На Диком Западе кликают быстрее пуль!',
    price: 18_000,
    rarity: 'rare',
    img: 'https://cdn.poehali.dev/projects/8908f6bc-a84f-4d41-836a-c95d7da5738b/files/b78e2fb0-bd47-4400-be18-8ed943c6f323.jpg',
    borderColor: '#D97706',
    glowColor: 'rgba(217,119,6,0.4)',
  },
  {
    id: 'pirate',
    name: 'Пират',
    tag: 'Capt_Clickbeard',
    emoji: '🏴‍☠️',
    description: 'Йо-хо-хо! Монеты или жизнь!',
    price: 25_000,
    rarity: 'rare',
    img: 'https://cdn.poehali.dev/projects/8908f6bc-a84f-4d41-836a-c95d7da5738b/files/e534bc50-be8e-48ac-82b2-80c9efd98b95.jpg',
    borderColor: '#1e3a5f',
    glowColor: 'rgba(30,58,95,0.5)',
  },

  // ── EPIC ────────────────────────────────────────────────────────────────────
  {
    id: 'vip',
    name: 'VIP Богач',
    tag: 'MoneyMaker_Pro',
    emoji: '👑',
    description: 'Золотая броня! Монеты сами летят в руки.',
    price: 50_000,
    rarity: 'epic',
    img: 'https://cdn.poehali.dev/projects/8908f6bc-a84f-4d41-836a-c95d7da5738b/files/16a2b813-3bf3-4664-837f-74c905a94bb0.jpg',
    borderColor: '#FFD700',
    glowColor: 'rgba(255,215,0,0.5)',
  },
  {
    id: 'robot',
    name: 'Киборг',
    tag: 'CyberClick_3000',
    emoji: '🤖',
    description: 'Полурот-получеловек. Кликает со скоростью процессора!',
    price: 75_000,
    rarity: 'epic',
    img: 'https://cdn.poehali.dev/projects/8908f6bc-a84f-4d41-836a-c95d7da5738b/files/2be48b00-b24d-45c2-b2d5-e93a187a13a1.jpg',
    borderColor: '#00B4D8',
    glowColor: 'rgba(0,180,216,0.45)',
  },
  {
    id: 'witch',
    name: 'Ведьма',
    tag: 'DarkSpell_Click',
    emoji: '🧙‍♀️',
    description: 'Заколдованные клики — каждый вдвойне злее!',
    price: 100_000,
    rarity: 'epic',
    img: 'https://cdn.poehali.dev/projects/8908f6bc-a84f-4d41-836a-c95d7da5738b/files/16a2b813-3bf3-4664-837f-74c905a94bb0.jpg',
    borderColor: '#a855f7',
    glowColor: 'rgba(168,85,247,0.45)',
  },
  {
    id: 'samurai',
    name: 'Самурай',
    tag: 'BushidoClicker',
    emoji: '⚔️',
    description: 'Честь и монеты. Кликает с достоинством.',
    price: 130_000,
    rarity: 'epic',
    img: 'https://cdn.poehali.dev/projects/8908f6bc-a84f-4d41-836a-c95d7da5738b/files/e534bc50-be8e-48ac-82b2-80c9efd98b95.jpg',
    borderColor: '#dc2626',
    glowColor: 'rgba(220,38,38,0.45)',
  },

  // ── LEGENDARY ───────────────────────────────────────────────────────────────
  {
    id: 'hero',
    name: 'Супергерой',
    tag: 'ClickHero_9000',
    emoji: '🦸',
    description: 'Спасает мир одним кликом! Легендарный!',
    price: 200_000,
    rarity: 'legendary',
    img: 'https://cdn.poehali.dev/projects/8908f6bc-a84f-4d41-836a-c95d7da5738b/files/4be02618-0feb-4e4e-82af-b9b010a046e2.jpg',
    borderColor: '#1A6BFF',
    glowColor: 'rgba(26,107,255,0.5)',
  },
  {
    id: 'dragon',
    name: 'Дракон',
    tag: 'DragonClick_FIRE',
    emoji: '🐉',
    description: 'Огнедышащий мастер кликов. Сжигает конкурентов!',
    price: 300_000,
    rarity: 'legendary',
    img: 'https://cdn.poehali.dev/projects/8908f6bc-a84f-4d41-836a-c95d7da5738b/files/4be02618-0feb-4e4e-82af-b9b010a046e2.jpg',
    borderColor: '#f97316',
    glowColor: 'rgba(249,115,22,0.55)',
  },

  // ── MYTHIC ───────────────────────────────────────────────────────────────────
  {
    id: 'god',
    name: 'Бог Кликов',
    tag: 'ClickGod_OMEGA',
    emoji: '⚡',
    description: 'Превзошёл смертных. Каждый клик — гром небесный!',
    price: 500_000,
    rarity: 'mythic',
    img: 'https://cdn.poehali.dev/projects/8908f6bc-a84f-4d41-836a-c95d7da5738b/files/16a2b813-3bf3-4664-837f-74c905a94bb0.jpg',
    borderColor: '#f0abfc',
    glowColor: 'rgba(240,171,252,0.6)',
  },
];

export const RARITY_LABEL: Record<string, string> = {
  common:    'ОБЫЧНЫЙ',
  rare:      'РЕДКИЙ',
  epic:      'ЭПИЧЕСКИЙ',
  legendary: 'ЛЕГЕНДАРНЫЙ',
  mythic:    'МИФИЧЕСКИЙ',
};

export const RARITY_COLOR: Record<string, string> = {
  common:    '#4a5768',
  rare:      '#1A6BFF',
  epic:      '#a855f7',
  legendary: '#FFD700',
  mythic:    '#f0abfc',
};
