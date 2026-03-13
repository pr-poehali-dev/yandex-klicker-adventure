export interface Skin {
  id: string;
  name: string;
  tag: string;         // никнейм под персонажем
  emoji: string;
  description: string;
  price: number;       // 0 = бесплатно, -1 = за рекламу
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  img: string;
  borderColor: string;
  glowColor: string;
}

export const SKINS: Skin[] = [
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
    id: 'ninja',
    name: 'Ниндзя',
    tag: 'ShadowKiller_X',
    emoji: '🥷',
    description: 'Быстрый и бесшумный. Кликает как ветер!',
    price: 1500,
    rarity: 'rare',
    img: 'https://cdn.poehali.dev/projects/8908f6bc-a84f-4d41-836a-c95d7da5738b/files/e534bc50-be8e-48ac-82b2-80c9efd98b95.jpg',
    borderColor: '#E61919',
    glowColor: 'rgba(230,25,25,0.4)',
  },
  {
    id: 'vip',
    name: 'VIP Богач',
    tag: 'MoneyMaker_Pro',
    emoji: '👑',
    description: 'Золотая броня! Монеты сами летят в руки.',
    price: 5000,
    rarity: 'epic',
    img: 'https://cdn.poehali.dev/projects/8908f6bc-a84f-4d41-836a-c95d7da5738b/files/16a2b813-3bf3-4664-837f-74c905a94bb0.jpg',
    borderColor: '#FFD700',
    glowColor: 'rgba(255,215,0,0.5)',
  },
  {
    id: 'alien',
    name: 'Пришелец',
    tag: 'UFO_Invader',
    emoji: '👽',
    description: 'Прилетел из другой галактики кликать!',
    price: -1,  // за просмотр рекламы
    rarity: 'rare',
    img: 'https://cdn.poehali.dev/projects/8908f6bc-a84f-4d41-836a-c95d7da5738b/files/2be48b00-b24d-45c2-b2d5-e93a187a13a1.jpg',
    borderColor: '#00B06F',
    glowColor: 'rgba(0,176,111,0.4)',
  },
  {
    id: 'hero',
    name: 'Супергерой',
    tag: 'ClickHero_9000',
    emoji: '🦸',
    description: 'Спасает мир одним кликом! Легендарный!',
    price: 12000,
    rarity: 'legendary',
    img: 'https://cdn.poehali.dev/projects/8908f6bc-a84f-4d41-836a-c95d7da5738b/files/4be02618-0feb-4e4e-82af-b9b010a046e2.jpg',
    borderColor: '#1A6BFF',
    glowColor: 'rgba(26,107,255,0.5)',
  },
];

export const RARITY_LABEL: Record<string, string> = {
  common: 'ОБЫЧНЫЙ',
  rare: 'РЕДКИЙ',
  epic: 'ЭПИЧЕСКИЙ',
  legendary: 'ЛЕГЕНДАРНЫЙ',
};

export const RARITY_COLOR: Record<string, string> = {
  common: '#4a5768',
  rare: '#1A6BFF',
  epic: '#a855f7',
  legendary: '#FFD700',
};
