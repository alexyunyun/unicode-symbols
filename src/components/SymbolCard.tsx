'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Symbol } from '@/data/symbols';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import CopyDropdown from './CopyDropdown';
import { useFavorites } from './FavoriteSymbols';
import { useLanguage } from '@/contexts/LanguageContext';

interface SymbolCardProps {
  symbol: Symbol;
  className?: string;
  isSelected?: boolean;
  onSelect?: (symbol: Symbol) => void;
}

export default function SymbolCard({ symbol, className, isSelected = false, onSelect }: SymbolCardProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [favoriteAction, setFavoriteAction] = useState(false);

  const handleQuickCopy = async () => {
    try {
      await navigator.clipboard.writeText(symbol.symbol);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(t('copy.failed') || '复制失败:', err);
    }
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(symbol.id)) {
      removeFromFavorites(symbol.id);
    } else {
      addToFavorites(symbol);
    }
    setFavoriteAction(true);
    setTimeout(() => setFavoriteAction(false), 1000);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // 如果点击的是符号本身，执行快速复制
    if ((e.target as HTMLElement).closest('.symbol-display')) {
      handleQuickCopy();
    }
    // 如果按住Ctrl/Cmd键，执行多选
    else if (e.ctrlKey || e.metaKey) {
      onSelect?.(symbol);
    }
    // 否则执行快速复制
    else {
      handleQuickCopy();
    }
  };

  return (
    <Card 
      className={cn(
        "group cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 border-2 relative",
        isSelected ? "border-primary bg-primary/5" : "hover:border-primary/50",
        className
      )}
      onClick={handleCardClick}
    >
      {/* 常用符号按钮 */}
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10",
          isFavorite(symbol.id) ? "opacity-100 text-yellow-500 hover:text-yellow-600" : "hover:text-yellow-500",
          favoriteAction && "scale-125"
        )}
        onClick={handleFavoriteToggle}
        title={isFavorite(symbol.id) ? t('favorites.remove') : t('favorites.add')}
      >
        <Star className={cn(
          "h-4 w-4 transition-all duration-200",
          isFavorite(symbol.id) ? "fill-current" : ""
        )} />
      </Button>

      <CardContent className="p-3 text-center">
        <div 
          className={cn(
            "symbol-display text-2xl mb-2 font-mono select-none cursor-pointer relative transition-all duration-200",
            copied ? "scale-110" : "hover:scale-105"
          )}
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          title={t('copy.symbol')}
        >
          {symbol.symbol}
          {copied && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-lg animate-pulse">
              {t('copy.success')}
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-xs text-foreground/90">
            {symbol.name}
          </h3>
          
          <Badge variant="outline" className="text-xs font-mono">
            {symbol.unicode}
          </Badge>
          
          <CopyDropdown symbol={symbol} />
        </div>
      </CardContent>
    </Card>
  );
}

interface SymbolGridProps {
  symbols: Symbol[];
  className?: string;
  selectedSymbols?: Symbol[];
  onSymbolSelect?: (symbol: Symbol) => void;
}

export function SymbolGrid({ symbols, className, selectedSymbols = [], onSymbolSelect }: SymbolGridProps) {
  const { t } = useLanguage();
  
  if (symbols.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-lg mb-2">{t('search.noResults')}</p>
        <p className="text-sm">{t('search.tips.adjust')}</p>
      </div>
    );
  }

  return (
    <div className={cn(
      "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3",
      className
    )}>
      {symbols.map((symbol) => (
        <SymbolCard 
          key={symbol.id} 
          symbol={symbol} 
          isSelected={selectedSymbols.some(s => s.id === symbol.id)}
          onSelect={onSymbolSelect}
        />
      ))}
    </div>
  );
}