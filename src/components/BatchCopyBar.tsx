'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, X } from 'lucide-react';
import { Symbol } from '@/data/symbols';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/contexts/ToastContext';

interface BatchCopyBarProps {
  selectedSymbols: Symbol[];
  onClear: () => void;
  className?: string;
}

export default function BatchCopyBar({ selectedSymbols, onClear, className }: BatchCopyBarProps) {
  const { t } = useLanguage();
  const { showSuccess, showError } = useToast();

  const handleBatchCopy = async () => {
    try {
      const symbolsText = selectedSymbols.map(s => s.symbol).join('');
      await navigator.clipboard.writeText(symbolsText);
      showSuccess(`${t('copy.batch')} ${t('copy.success') || '已复制到剪贴板'}`);
    } catch (err) {
      console.error(t('copy.failed') || '批量复制失败:', err);
      showError(t('copy.failed') || '批量复制失败');
    }
  };

  if (selectedSymbols.length === 0) return null;

  return (
    <div className={cn(
      "fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground rounded-lg shadow-lg p-4 flex items-center gap-3 z-50 animate-in slide-in-from-bottom-2",
      className
    )}>
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
          {t('copy.selected', { count: selectedSymbols.length })}
        </Badge>
        <span className="text-sm font-medium">
          {selectedSymbols.map(s => s.symbol).join('')}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          onClick={handleBatchCopy}
          variant="secondary"
          size="sm"
          className={cn(
            "transition-all duration-200",
            "bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
          )}
        >
          <Copy className="w-3 h-3 mr-1" />
          {t('copy.batch')}
        </Button>
        
        <Button
          onClick={onClear}
          variant="ghost"
          size="sm"
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}