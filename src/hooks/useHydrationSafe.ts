'use client';

import { useEffect } from 'react';
import { useFavoritesStore } from '@/store/favoritesStore';

/**
 * 用于处理 hydration 安全的初始化 hook
 * 确保客户端状态与服务端渲染保持一致
 */
export function useHydrationSafe() {
  const initializeFromStorage = useFavoritesStore(state => state.initializeFromStorage);
  const mounted = useFavoritesStore(state => state.mounted);

  useEffect(() => {
    if (!mounted) {
      initializeFromStorage();
    }
  }, [initializeFromStorage, mounted]);

  return { mounted };
}