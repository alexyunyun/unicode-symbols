'use client';

import { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface SectionHeaderProps {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  count?: number;
  className?: string;
}

export default function SectionHeader({ 
  id, 
  title, 
  description, 
  icon, 
  count, 
  className 
}: SectionHeaderProps) {
  const { t } = useLanguage();
  
  return (
    <div 
      id={id}
      className={cn("scroll-mt-24 space-y-4 mb-8", className)}
    >
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {title}
            </h2>
            {count !== undefined && (
              <Badge variant="secondary" className="mt-1">
                {count} {id === 'symbols' ? t('sections.symbols.count_unit') : id === 'favorites' ? t('sections.favorites.count_unit') : t('common.items')}
              </Badge>
            )}
          </div>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      </div>
      
      {/* 分隔线 */}
      <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto"></div>
    </div>
  );
}