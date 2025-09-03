'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Copy, 
  ChevronDown, 
  Star, 
  Keyboard, 
  MousePointer,
  Eye,
  BookOpen
} from 'lucide-react';

export default function UserGuide() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      {/* 快速入门 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            {t('guide.quickStart.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">{t('guide.quickStart.search.title')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {(() => {
                  const items = t('guide.quickStart.search.items');
                  return Array.isArray(items) ? items.map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  )) : null;
                })()}
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">{t('guide.quickStart.category.title')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {(() => {
                  const items = t('guide.quickStart.category.items');
                  return Array.isArray(items) ? items.map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  )) : null;
                })()}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 复制功能说明 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Copy className="h-5 w-5 text-green-500" />
            {t('guide.copy.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <MousePointer className="h-4 w-4" />
                {t('guide.copy.quick.title')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('guide.copy.quick.desc')}
              </p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">{t('guide.copy.quick.code')}</code>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <ChevronDown className="h-4 w-4" />
                {t('guide.copy.format.title')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('guide.copy.format.desc')}
              </p>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs">Unicode</Badge>
                <Badge variant="outline" className="text-xs">HTML</Badge>
                <Badge variant="outline" className="text-xs">CSS</Badge>
                <Badge variant="outline" className="text-xs">LaTeX</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Keyboard className="h-4 w-4" />
                {t('guide.copy.batch.title')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('guide.copy.batch.desc')}
              </p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">{t('guide.copy.batch.code')}</code>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
              {t('guide.copy.formats.title')}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              {(() => {
                const items = t('guide.copy.formats.items');
                return Array.isArray(items) ? items.map((item: string, index: number) => (
                  <div key={index}>• {item}</div>
                )) : null;
              })()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 常用符号功能 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            {t('guide.favorites.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">{t('guide.favorites.add.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('guide.favorites.add.desc')}
                </p>
                <div className="flex items-center gap-2 p-2 bg-muted rounded">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">{t('guide.favorites.add.action')}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold">{t('guide.favorites.manage.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('guide.favorites.manage.desc')}
                </p>
                <div className="flex items-center gap-2 p-2 bg-muted rounded">
                  <Eye className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{t('guide.favorites.manage.action')}</span>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                {t('guide.favorites.warning')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 键盘快捷键 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5 text-purple-500" />
            {t('guide.shortcuts.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold">{t('guide.shortcuts.basic.title')}</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t('guide.shortcuts.basic.search')}</span>
                  <Badge variant="outline">Ctrl + F</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t('guide.shortcuts.basic.multiSelect')}</span>
                  <Badge variant="outline">Ctrl + 点击</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t('guide.shortcuts.basic.clear')}</span>
                  <Badge variant="outline">Esc</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold">{t('guide.shortcuts.advanced.title')}</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t('guide.shortcuts.advanced.theme')}</span>
                  <Badge variant="outline">Ctrl + D</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">复制选中符号</span>
                  <Badge variant="outline">Ctrl + C</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">全选当前分类</span>
                  <Badge variant="outline">Ctrl + A</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}