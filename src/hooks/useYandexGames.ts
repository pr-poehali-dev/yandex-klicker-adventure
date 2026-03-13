import { useEffect, useRef, useState } from 'react';

/* Типы для Yandex Games SDK */
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
}

interface YaLeaderboards {
  setLeaderboardScore: (name: string, score: number) => Promise<void>;
  getLeaderboardPlayerEntry: (name: string) => Promise<unknown>;
}

type AdStatus = 'idle' | 'loading' | 'showing' | 'rewarded' | 'closed' | 'error';

export function useYandexGames() {
  const sdkRef = useRef<YaSDK | null>(null);
  const [ready, setReady] = useState(false);
  const [adStatus, setAdStatus] = useState<AdStatus>('idle');

  useEffect(() => {
    if (!window.YaGames) {
      console.warn('[YaGames] SDK не загружен — работаем в dev-режиме');
      return;
    }
    window.YaGames.init()
      .then(sdk => {
        sdkRef.current = sdk;
        setReady(true);
        console.log('[YaGames] SDK инициализирован');
      })
      .catch(err => console.warn('[YaGames] Ошибка инициализации', err));
  }, []);

  /**
   * Показать Rewarded Video (реклама за награду).
   * onRewarded вызывается только если пользователь досмотрел.
   */
  const showRewardedAd = (onRewarded: () => void, onFail?: () => void) => {
    setAdStatus('loading');

    // DEV-режим: SDK не загружен — сразу даём награду через 1.5с
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
   * Вызывается между уровнями / при открытии игры.
   */
  const showFullscreenAd = (onClose?: () => void) => {
    if (!sdkRef.current) {
      // DEV-режим: симулируем показ на 0.5с потом закрываем
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

  return { ready, adStatus, showRewardedAd, showFullscreenAd, submitScore };
}