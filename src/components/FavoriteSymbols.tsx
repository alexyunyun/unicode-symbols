'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Symbol } from '@/data/symbols';
import { cn } from '@/lib/utils';
import { Star, Heart, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FavoriteSymbolsProps {
  className?: string;
  onSymbolSelect?: (symbol: Symbol) => void;
}

export default function FavoriteSymbols({ className }: FavoriteSymbolsProps) {
  const { t } = useLanguage();
  const [favorites, setFavorites] = useState<Symbol[]>([]);

  // 避免未使用变量警告（保留接口完整性）
  // onSymbolSelect 参数保留用于未来扩展

  // 从localStorage加载常用符号
  useEffect(() => {
    const savedFavorites = localStorage.getItem('unicode-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    }
  }, []);

  // 保存到localStorage
  const saveFavorites = (newFavorites: Symbol[]) => {
    localStorage.setItem('unicode-favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  // 添加到常用符号（保留用于未来功能扩展）
  // const addToFavorites = (symbol: Symbol) => {
  //   const isAlreadyFavorite = favorites.some(fav => fav.id === symbol.id);
  //   if (!isAlreadyFavorite) {
  //     const newFavorites = [...favorites, symbol];
  //     saveFavorites(newFavorites);
  //   }
  // };

  // 从常用符号移除
  const removeFromFavorites = (symbolId: string) => {
    const newFavorites = favorites.filter(fav => fav.id !== symbolId);
    saveFavorites(newFavorites);
  };

  // 清空所有常用符号
  const clearAllFavorites = () => {
    saveFavorites([]);
  };

  // 检查是否为常用符号（保留用于未来功能扩展）
  // const isFavorite = (symbolId: string) => {
  //   return favorites.some(fav => fav.id === symbolId);
  // };

  // 快速复制符号
  const handleQuickCopy = async (symbol: Symbol) => {
    try {
      await navigator.clipboard.writeText(symbol.symbol);
      // 可以添加复制成功的提示
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            {t('sections.favorites.title')}
            <Badge variant="secondary" className="ml-2">
              {favorites.length}
            </Badge>
          </CardTitle>
          {favorites.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFavorites}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {t('favorites.clear')}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {favorites.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-lg mb-2">{t('favorites.empty')}</p>
            <p className="text-sm">
              {t('favorites.emptyDesc')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
            {favorites.map((symbol) => (
              <div
                key={symbol.id}
                className="group relative cursor-pointer transition-all duration-200 hover:scale-105"
              >
                <Card className="border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-2 text-center">
                    <div
                      className="text-xl mb-1 font-mono select-none cursor-pointer"
                      onClick={() => handleQuickCopy(symbol)}
                      title={t('copy.symbol')}
                    >
                      {symbol.symbol}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {symbol.name}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute -top-1 -right-1 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromFavorites(symbol.id);
                      }}
                    >
                      ×
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// 导出添加到常用符号的Hook
export function useFavorites() {
  const [favorites, setFavorites] = useState<Symbol[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('unicode-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    }
  }, []);

  const addToFavorites = (symbol: Symbol) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === symbol.id);
    if (!isAlreadyFavorite) {
      const newFavorites = [...favorites, symbol];
      localStorage.setItem('unicode-favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
      return true;
    }
    return false;
  };

  const removeFromFavorites = (symbolId: string) => {
    const newFavorites = favorites.filter(fav => fav.id !== symbolId);
    localStorage.setItem('unicode-favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
    return true;
  };

  const isFavorite = (symbolId: string) => {
    return favorites.some(fav => fav.id === symbolId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
}