import { useEffect, useRef, useState, useCallback } from 'react';

declare global {
  interface Window {
    YaGames?: {
      init: (options?: object) => Promise<YaSDK>;
    };
  }
}

interface YaSDK {
  adv: {
    showRewardedVideo: (opts: {
      callbacks: {
        onOpen?: () => void;
        onRewarded?: () => void;
        onClose?: (wasShown: boolean) => void;
        onError?: (err: unknown) => void;
      };
    }) => void;
    showFullscreenAdv: (opts: {
      callbacks: {
        onOpen?: () => void;
        onClose?: (wasShown: boolean) => void;
        onError?: (err: unknown) => void;
      };
    }) => void;
  };
  getLeaderboards: () => Promise<YaLeaderboards>;
  getPlayer: (opts?: { scopes?: boolean }) => Promise<YaPlayer>;
}

interface YaLeaderboards {
  setLeaderboardScore: (name: string, score: number) => Promise<void>;
  getLeaderboardPlayerEntry: (name: string) => Promise<unknown>;
}

interface YaPlayer {
  setData: (data: Record<string, unknown>, flush?: boolean) => Promise<void>;
  getData: (keys?: string[]) => Promise<Record<string, unknown>>;
  getUniqueID: () => string;
  getName: () => string;
  getPhoto: (size: 'small' | 'medium' | 'large') => string;
}

type AdStatus = 'idle' | 'loading' | 'showing' | 'rewarded' | 'closed' | 'error';

export function useYandexGames() {
  const sdkRef = useRef<YaSDK | null>(null);
  const playerRef = useRef<YaPlayer | null>(null);
  const [ready, setReady] = useState(false);
  const [adStatus, setAdStatus] = useState<AdStatus>('idle');

  useEffect(() => {
    if (!window.YaGames) {
      console.warn('[YaGames] SDK не загружен — работаем в dev-режиме');
      return;
    }
    window.YaGames.init()
      .then(async sdk => {
        sdkRef.current = sdk;
        try {
          playerRef.current = await sdk.getPlayer({ scopes: false });
        } catch (e) {
          console.warn('[YaGames] Не удалось получить Player', e);
        }
        setReady(true);
        console.log('[YaGames] SDK инициализирован');
      })
      .catch(err => console.warn('[YaGames] Ошибка инициализации', err));
  }, []);

  /**
   * Сохранить прогресс игрока в облако Яндекс.
   * data — любой сериализуемый объект (состояние игры).
   */
  const saveProgress = useCallback(async (data: Record<string, unknown>) => {
    if (!playerRef.current) return;
    try {
      await playerRef.current.setData(data, true);
    } catch (e) {
      console.warn('[YaGames] Ошибка сохранения прогресса', e);
    }
  }, []);

  /**
   * Загрузить прогресс игрока из облака Яндекс.
   * Возвращает объект с данными или null если SDK не готов.
   */
  const loadProgress = useCallback(async (): Promise<Record<string, unknown> | null> => {
    if (!playerRef.current) return null;
    try {
      return await playerRef.current.getData();
    } catch (e) {
      console.warn('[YaGames] Ошибка загрузки прогресса', e);
      return null;
    }
  }, []);

  /**
   * Показать Rewarded Video (реклама за награду).
   */
  const showRewardedAd = (onRewarded: () => void, onFail?: () => void) => {
    setAdStatus('loading');

    if (!sdkRef.current) {
      console.log('[YaGames] DEV: симулируем rewarded ad');
      setTimeout(() => {
        setAdStatus('rewarded');
        onRewarded();
        setTimeout(() => setAdStatus('idle'), 1000);
      }, 1500);
      return;
    }

    sdkRef.current.adv.showRewardedVideo({
      callbacks: {
        onOpen: () => setAdStatus('showing'),
        onRewarded: () => {
          setAdStatus('rewarded');
          onRewarded();
        },
        onClose: () => setTimeout(() => setAdStatus('idle'), 500),
        onError: (err) => {
          console.warn('[YaGames] Rewarded ad error', err);
          setAdStatus('error');
          onFail?.();
          setTimeout(() => setAdStatus('idle'), 1500);
        },
      },
    });
  };

  /**
   * Показать полноэкранную рекламу (interstitial).
   */
  const showFullscreenAd = (onClose?: () => void) => {
    if (!sdkRef.current) {
      setTimeout(() => onClose?.(), 500);
      return;
    }
    sdkRef.current.adv.showFullscreenAdv({
      callbacks: {
        onClose: () => { onClose?.(); },
        onError: (err) => { console.warn('[YaGames] Fullscreen ad error', err); onClose?.(); },
      },
    });
  };

  /**
   * Отправить счёт в таблицу лидеров Яндекс Игр.
   */
  const submitScore = async (score: number, leaderboardName = 'main') => {
    if (!sdkRef.current) return;
    try {
      const lb = await sdkRef.current.getLeaderboards();
      await lb.setLeaderboardScore(leaderboardName, score);
    } catch (e) {
      console.warn('[YaGames] Ошибка отправки счёта', e);
    }
  };

  return { ready, adStatus, showRewardedAd, showFullscreenAd, submitScore, saveProgress, loadProgress };
}
