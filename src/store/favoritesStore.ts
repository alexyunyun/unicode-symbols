import { create } from 'zustand';
import { Symbol } from '@/data/symbols';
import { debounce } from 'lodash';

interface FavoritesState {
  favorites: Symbol[];
  favoritesMap: Record<string, boolean>; // 用于快速查找
  mounted: boolean; // 用于 hydration 安全
  addToFavorites: (symbol: Symbol) => boolean;
  removeFromFavorites: (symbolId: string) => boolean;
  isFavorite: (symbolId: string) => boolean;
  initializeFromStorage: () => void;
}

// 创建一个防抖的localStorage保存函数
const debouncedSaveToLocalStorage = debounce((favorites: Symbol[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('unicode-favorites', JSON.stringify(favorites));
  }
}, 300); // 300ms防抖时间

// 创建收藏状态管理store
export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  favoritesMap: {},
  mounted: false,
  
  initializeFromStorage: () => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('unicode-favorites');
      if (savedFavorites) {
        try {
          const favorites = JSON.parse(savedFavorites) as Symbol[];
          const favoritesMap: Record<string, boolean> = {};
          favorites.forEach(fav => {
            favoritesMap[fav.id] = true;
          });
          set({ favorites, favoritesMap, mounted: true });
        } catch (error) {
          console.error('Failed to load favorites:', error);
          set({ mounted: true });
        }
      } else {
        set({ mounted: true });
      }
    }
  },
  
  addToFavorites: (symbol: Symbol) => {
    const { favorites, favoritesMap } = get();
    const isAlreadyFavorite = favoritesMap[symbol.id];
    
    if (!isAlreadyFavorite) {
      const newFavorites = [...favorites, symbol];
      const newFavoritesMap = { ...favoritesMap, [symbol.id]: true };
      
      // 使用防抖函数保存到localStorage
      debouncedSaveToLocalStorage(newFavorites);
      
      set({ favorites: newFavorites, favoritesMap: newFavoritesMap });
      return true;
    }
    return false;
  },
  
  removeFromFavorites: (symbolId: string) => {
    const { favorites, favoritesMap } = get();
    const newFavorites = favorites.filter(fav => fav.id !== symbolId);
    
    // 创建新的favoritesMap，删除对应的id
    const newFavoritesMap = { ...favoritesMap };
    delete newFavoritesMap[symbolId];
    
    // 使用防抖函数保存到localStorage
    debouncedSaveToLocalStorage(newFavorites);
    
    set({ favorites: newFavorites, favoritesMap: newFavoritesMap });
    return true;
  },
  
  isFavorite: (symbolId: string) => {
    const { favoritesMap, mounted } = get();
    if (!mounted) return false; // hydration 安全：未 mounted 时返回 false
    return !!favoritesMap[symbolId]; // 使用Map进行O(1)时间复杂度的查找
  }
}));