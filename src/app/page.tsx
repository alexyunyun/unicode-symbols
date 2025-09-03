'use client';

import { useState, useMemo } from 'react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import SearchBar from '@/components/SearchBar';
import CategoryNav from '@/components/CategoryNav';
import { SymbolGrid } from '@/components/SymbolCard';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BatchCopyBar from '@/components/BatchCopyBar';
import FavoriteSymbols, { useFavorites } from '@/components/FavoriteSymbols';
import QuickNav from '@/components/QuickNav';
import SectionHeader from '@/components/SectionHeader';
import UserGuide from '@/components/UserGuide';
import FAQ from '@/components/FAQ';
import { symbols, categories } from '@/data/symbols';
import { Badge } from '@/components/ui/badge';
import { 
  Grid3X3, 
  Star, 
  BookOpen, 
  HelpCircle 
} from 'lucide-react';

function HomePage() {
  const { t, tArray } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedSymbols, setSelectedSymbols] = useState<typeof symbols>([]);
  
  const { favorites } = useFavorites();

  // 避免未使用变量警告
  void tArray;

  // 过滤符号
  const filteredSymbols = useMemo(() => {
    let filtered = symbols;

    // 按分类过滤
    if (activeCategory) {
      filtered = filtered.filter(symbol => symbol.category === activeCategory);
    }

    // 按搜索查询过滤
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(symbol => 
        symbol.name.toLowerCase().includes(query) ||
        symbol.symbol.includes(query) ||
        symbol.unicode.toLowerCase().includes(query) ||
        symbol.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, activeCategory]);

  // 计算每个分类的符号数量
  const symbolCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: symbols.length
    };
    
    categories.forEach(category => {
      counts[category.id] = symbols.filter(symbol => symbol.category === category.id).length;
    });
    
    return counts;
  }, []);

  // 获取当前分类信息
  const currentCategory = activeCategory ? categories.find(cat => cat.id === activeCategory) : null;

  // 处理符号选择
  const handleSymbolSelect = (symbol: typeof symbols[0]) => {
    setSelectedSymbols(prev => {
      const isSelected = prev.some(s => s.id === symbol.id);
      if (isSelected) {
        return prev.filter(s => s.id !== symbol.id);
      } else {
        return [...prev, symbol];
      }
    });
  };

  // 清空选中的符号
  const handleClearSelection = () => {
    setSelectedSymbols([]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 头部 */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {t('nav.title')}
              </h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                {t('sections.symbols.count', { count: symbols.length })}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* 快速导航 */}
      <QuickNav 
        symbolCount={symbols.length}
        favoriteCount={favorites.length}
      />

      <main className="container mx-auto px-4 py-8 space-y-16">
        {/* 符号大全区域 */}
        <section className="space-y-8">
          <SectionHeader
            id="symbols"
            title={t('sections.symbols.title') as string}
            description={t('sections.symbols.description') as string}
            icon={<Grid3X3 className="h-6 w-6" />}
            count={symbols.length}
          />

          {/* 搜索栏 */}
          <div className="text-center space-y-4">
            <SearchBar 
              onSearch={setSearchQuery} 
              placeholder={t('search.placeholder') as string}
            />
            <div className="text-sm text-muted-foreground space-y-1">
              <div>
                {t('search.tips.click') as string} | {t('search.tips.dropdown') as string} | {t('search.tips.multiSelect') as string} | {t('search.tips.favorite') as string}
              </div>
              <div>
                {t('search.tips.formats') as string}
              </div>
            </div>
          </div>

          {/* 分类导航 */}
          <CategoryNav
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            symbolCounts={symbolCounts}
          />

          {/* 当前分类信息 */}
          {currentCategory && (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">{currentCategory.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{currentCategory.description}</p>
              <Badge variant="outline">
                {t('search.resultCount', { count: filteredSymbols.length })}
              </Badge>
            </div>
          )}

          {/* 符号网格 */}
          <SymbolGrid 
            symbols={filteredSymbols}
            selectedSymbols={selectedSymbols}
            onSymbolSelect={handleSymbolSelect}
          />
        </section>

        {/* 常用符号区域 */}
        <section className="space-y-8">
          <SectionHeader
            id="favorites"
            title={t('sections.favorites.title')}
            description={t('sections.favorites.description')}
            icon={<Star className="h-6 w-6" />}
            count={favorites.length}
          />
          
          <FavoriteSymbols onSymbolSelect={handleSymbolSelect} />
          
          {favorites.length > 0 && (
            <div className="text-center space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  {t('tips.usage.title')}
                </h4>
                <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                  {(() => {
                    const items = t('tips.usage.items');
                    return Array.isArray(items) ? items.map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    )) : null;
                  })()}
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* 使用说明区域 */}
        <section className="space-y-8">
          <SectionHeader
            id="guide"
            title={t('sections.guide.title')}
            description={t('sections.guide.description')}
            icon={<BookOpen className="h-6 w-6" />}
          />
          
          <UserGuide />
        </section>

        {/* 常见问题区域 */}
        <section className="space-y-8">
          <SectionHeader
            id="faq"
            title={t('sections.faq.title')}
            description={t('sections.faq.description')}
            icon={<HelpCircle className="h-6 w-6" />}
          />
          
          <FAQ />
        </section>

        {/* 底部信息 */}
        <footer className="border-t pt-8 mt-16">
          <div className="text-center text-sm text-muted-foreground space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold mb-2">{t('footer.features.title')}</h4>
                <ul className="space-y-1">
                  {(() => {
                    const items = t('footer.features.items');
                    return Array.isArray(items) ? items.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    )) : null;
                  })()}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t('footer.tech.title')}</h4>
                <ul className="space-y-1">
                  {(() => {
                    const items = t('footer.tech.items');
                    return Array.isArray(items) ? items.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    )) : null;
                  })()}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t('footer.support.title')}</h4>
                <ul className="space-y-1">
                  {(() => {
                    const items = t('footer.support.items');
                    return Array.isArray(items) ? items.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    )) : null;
                  })()}
                </ul>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="mb-2">
                {t('footer.description', { count: symbols.length })}
              </p>
              <p>
                {t('footer.made')}
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* 批量操作栏 */}
      {selectedSymbols.length > 0 && (
        <BatchCopyBar
          selectedSymbols={selectedSymbols}
          onClear={handleClearSelection}
        />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  );
}