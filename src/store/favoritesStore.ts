import { create } from 'zustand';
import { Symbol } from '@/data/symbols';
import { debounce } from 'lodash';

interface FavoritesState {
  favorites: Symbol[];
  favoritesMap: Record<string, boolean>; // 用于快速查找
  addToFavorites: (symbol: Symbol) => boolean;
  removeFromFavorites: (symbolId: string) => boolean;
  isFavorite: (symbolId: string) => boolean;
}

// 创建一个防抖的localStorage保存函数
const debouncedSaveToLocalStorage = debounce((favorites: Symbol[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('unicode-favorites', JSON.stringify(favorites));
  }
}, 300); // 300ms防抖时间

// 创建收藏状态管理store
export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: (() => {
    // 初始化时从localStorage加载收藏
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('unicode-favorites');
      if (savedFavorites) {
        try {
          return JSON.parse(savedFavorites);
        } catch (error) {
          console.error('Failed to load favorites:', error);
        }
      }
    }
    return [];
  })(),
  
  // 创建一个Map用于O(1)时间复杂度的查找
  favoritesMap: (() => {
    const map: Record<string, boolean> = {};
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('unicode-favorites');
      if (savedFavorites) {
        try {
          const favorites = JSON.parse(savedFavorites) as Symbol[];
          favorites.forEach(fav => {
            map[fav.id] = true;
          });
        } catch (error) {
          console.error('Failed to build favorites map:', error);
        }
      }
    }
    return map;
  })(),
  
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
    const { favoritesMap } = get();
    return !!favoritesMap[symbolId]; // 使用Map进行O(1)时间复杂度的查找
  }
}));