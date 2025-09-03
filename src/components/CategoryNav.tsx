'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { categories, SymbolCategory } from '@/data/symbols';
import { cn } from '@/lib/utils';

interface CategoryNavProps {
  activeCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  symbolCounts?: Record<string, number>;
  className?: string;
}

export default function CategoryNav({ 
  activeCategory, 
  onCategoryChange, 
  symbolCounts = {},
  className 
}: CategoryNavProps) {
  const { t } = useLanguage();
  
  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* 所有分类统一显示 */}
      <div className="space-y-3">
        <div className="flex justify-center">
          <Button
            variant={activeCategory === null ? "default" : "outline"}
            onClick={() => onCategoryChange(null)}
            className="rounded-full px-4 py-2 text-sm cursor-pointer transition-all hover:scale-105 font-medium"
          >
            🌍 {t('categories.all')}
            {symbolCounts.all && (
              <Badge variant="secondary" className="ml-2 px-2 py-0.5 text-xs font-medium">
                {symbolCounts.all}
              </Badge>
            )}
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center max-w-6xl mx-auto">
          {categories.map((category: SymbolCategory) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => onCategoryChange(category.id)}
              className="rounded-full px-3 py-1.5 text-sm cursor-pointer transition-all hover:scale-105"
            >
              {t(`categories.${category.id}`) || category.name}
              {symbolCounts[category.id] && (
                <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                  {symbolCounts[category.id]}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}