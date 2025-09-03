'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Grid3X3, 
  Star, 
  BookOpen, 
  HelpCircle, 
  ChevronUp,
  X,
  Navigation
} from 'lucide-react';

interface QuickNavProps {
  symbolCount?: number;
  favoriteCount?: number;
}

const sections = [
  {
    id: 'symbols',
    labelKey: 'sections.symbols.title',
    descriptionKey: 'sections.symbols.description',
    icon: <Grid3X3 className="h-4 w-4" />
  },
  {
    id: 'favorites',
    labelKey: 'sections.favorites.title',
    descriptionKey: 'sections.favorites.description',
    icon: <Star className="h-4 w-4" />
  },
  {
    id: 'guide',
    labelKey: 'sections.guide.title',
    descriptionKey: 'sections.guide.description',
    icon: <BookOpen className="h-4 w-4" />
  },
  {
    id: 'faq',
    labelKey: 'sections.faq.title',
    descriptionKey: 'sections.faq.description',
    icon: <HelpCircle className="h-4 w-4" />
  }
];

export default function QuickNav({ symbolCount, favoriteCount }: QuickNavProps) {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('symbols');
  const [isVisible, setIsVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setShowBackToTop(scrollTop > 300);
      setIsVisible(scrollTop > 200); // 滚动200px后显示导航按钮

      // 检测当前可见的区域
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }));

      for (const { id, element } of sectionElements) {
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top <= 100 && rect.bottom >= 100;
          if (isVisible) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 100; // 考虑固定头部的高度
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsNavOpen(false); // 导航后关闭菜单
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.quick-nav-container')) {
        setIsNavOpen(false);
      }
    };

    if (isNavOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNavOpen]);

  return (
    <>
      {/* 紧凑的导航按钮 */}
      {isVisible && (
        <div className={cn(
          "quick-nav-container fixed right-6 bottom-20 z-40 transition-all duration-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
        )}>
          {/* 主导航按钮 */}
          <div className="relative">
            <Button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className={cn(
                "h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground border-2",
                isNavOpen ? "border-primary-foreground/20" : "border-transparent"
              )}
              title={t('nav.quickNav') as string}
            >
              {isNavOpen ? <X className="h-5 w-5" /> : <Navigation className="h-5 w-5" />}
            </Button>
            
            {/* 当前区域指示器 */}
            <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-accent border-2 border-background flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-accent-foreground"></div>
            </div>
          </div>

          {/* 导航菜单气泡 */}
          {isNavOpen && (
            <div className={cn(
              "absolute right-0 bottom-16 transform",
              "bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-2 space-y-1 min-w-[200px]",
              "animate-in slide-in-from-left-2 duration-200"
            )}>
              {/* 气泡箭头 */}
              <div className="absolute bottom-0 right-6 transform translate-y-1 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-border"></div>
              <div className="absolute bottom-0 right-6 transform translate-y-0.5 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-background"></div>
              
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "w-full justify-start text-left gap-3 h-auto py-3 px-3",
                    activeSection === section.id && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => scrollToSection(section.id)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    {section.icon}
                    <div className="flex-1">
                      <div className="font-medium text-sm">{t(section.labelKey) as string}</div>
                      <div className="text-xs opacity-70">{t(section.descriptionKey) as string}</div>
                    </div>
                    {section.id === 'symbols' && symbolCount && (
                      <Badge variant="secondary" className="ml-auto text-xs h-5">
                        {symbolCount}
                      </Badge>
                    )}
                    {section.id === 'favorites' && favoriteCount !== undefined && (
                      <Badge variant="secondary" className="ml-auto text-xs h-5">
                        {favoriteCount}
                      </Badge>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 移动端顶部导航（保持不变） */}
      <div className="lg:hidden sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-2">
            <div className="flex gap-1">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  size="sm"
                  className="h-8 px-2"
                  onClick={() => scrollToSection(section.id)}
                  title={t(section.descriptionKey) as string}
                >
                  {section.icon}
                  <span className="sr-only">{t(section.labelKey) as string}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 回到顶部按钮 */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-6 right-6 z-50 h-10 w-10 rounded-full shadow-lg transition-all duration-300",
            "hover:scale-110 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          )}
          size="sm"
          title={t('nav.backToTop') as string}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}