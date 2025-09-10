'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Symbol } from '@/data/symbols';
import { cn } from '@/lib/utils';
import { useFavoritesStore } from '@/store/favoritesStore';
import { Heart, Star, Trash2 } from 'lucide-react';
import { memo, useCallback, useState } from 'react';
import CopyDropdown from './CopyDropdown';

interface FavoriteSymbolsProps {
  className?: string;
  onSymbolSelect?: (symbol: Symbol) => void;
}

function FavoriteSymbols({ className }: FavoriteSymbolsProps) {
  const { t, language } = useLanguage();
  const { favorites, removeFromFavorites } = useFavoritesStore();

  // 避免未使用变量警告（保留接口完整性）
  // onSymbolSelect 参数保留用于未来扩展

  // 清空所有常用符号
  const clearAllFavorites = useCallback(() => {
    // 逐个删除所有收藏
    [...favorites].forEach((fav) => removeFromFavorites(fav.id));
  }, [favorites, removeFromFavorites]);

  // 检查是否为常用符号（保留用于未来功能扩展）
  // const isFavorite = (symbolId: string) => {
  //   return favorites.some(fav => fav.id === symbolId);
  // };

  // 快速复制符号
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);

  const handleQuickCopy = useCallback(async (symbol: Symbol) => {
    try {
      await navigator.clipboard.writeText(symbol.symbol);
      setCopiedSymbol(symbol.id);
      setTimeout(() => setCopiedSymbol(null), 1500);
    } catch (err) {
      console.error('复制失败:', err);
    }
  }, []);

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            {t('sections.favorites.title')}
            <Badge
              variant="secondary"
              className="ml-2"
            >
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
            <p className="text-sm">{t('favorites.emptyDesc')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
            {favorites.map((symbol) => (
              <div
                key={symbol.id}
                className="group relative cursor-pointer transition-all duration-200 hover:scale-105"
              >
                <Card className="border-2 hover:border-primary/50 transition-colors min-w-[90px]">
                  <CardContent className="p-3 text-center">
                    <div
                      className={cn(
                        'text-xl mb-1 font-mono select-none cursor-pointer relative transition-all duration-200',
                        copiedSymbol === symbol.id
                          ? 'scale-110'
                          : 'hover:scale-105',
                      )}
                      onClick={() => handleQuickCopy(symbol)}
                      title={t('copy.symbol')}
                    >
                      {symbol.symbol}
                      {copiedSymbol === symbol.id && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-lg animate-pulse">
                          {t('copy.success')}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {language === 'en' && symbol.name_en
                        ? symbol.name_en
                        : language === 'ja' && symbol.name_ja
                        ? symbol.name_ja
                        : symbol.name}
                    </div>
                    <div className="mt-1">
                      <CopyDropdown
                        symbol={symbol}
                        className="w-full h-6 text-xs"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute -top-1 -right-1 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full"
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

// 使用React.memo包装组件，避免不必要的重渲染
export default memo(FavoriteSymbols);

// useFavorites hook已移至 @/store/favoritesStore
