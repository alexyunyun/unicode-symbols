'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  AlertCircle, 
  Info, 
  CheckCircle,
  Copy,
  Search,
  Smartphone,
  Globe
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FAQItem {
  id: string;
  questionKey: string;
  answerKey: string;
  category: 'basic' | 'technical' | 'troubleshooting' | 'advanced';
  icon: React.ReactNode;
}

// FAQ数据结构，使用多语言键
const faqItems: FAQItem[] = [
  {
    id: '1',
    questionKey: 'faq.items.device_display.question',
    answerKey: 'faq.items.device_display.answer',
    category: 'troubleshooting',
    icon: <Smartphone className="h-4 w-4" />
  },
  {
    id: '2',
    questionKey: 'faq.items.copy_paste.question',
    answerKey: 'faq.items.copy_paste.answer',
    category: 'troubleshooting',
    icon: <Copy className="h-4 w-4" />
  },
  {
    id: '3',
    questionKey: 'faq.items.web_usage.question',
    answerKey: 'faq.items.web_usage.answer',
    category: 'technical',
    icon: <Globe className="h-4 w-4" />
  },
  {
    id: '4',
    questionKey: 'faq.items.latex.question',
    answerKey: 'faq.items.latex.answer',
    category: 'advanced',
    icon: <Info className="h-4 w-4" />
  },
  {
    id: '5',
    questionKey: 'faq.items.favorites_storage.question',
    answerKey: 'faq.items.favorites_storage.answer',
    category: 'basic',
    icon: <HelpCircle className="h-4 w-4" />
  },
  {
    id: '6',
    questionKey: 'faq.items.search_symbols.question',
    answerKey: 'faq.items.search_symbols.answer',
    category: 'basic',
    icon: <Search className="h-4 w-4" />
  },
  {
    id: '7',
    questionKey: 'faq.items.batch_copy.question',
    answerKey: 'faq.items.batch_copy.answer',
    category: 'advanced',
    icon: <Copy className="h-4 w-4" />
  },
  {
    id: '8',
    questionKey: 'faq.items.search_accuracy.question',
    answerKey: 'faq.items.search_accuracy.answer',
    category: 'troubleshooting',
    icon: <Search className="h-4 w-4" />
  },
  {
    id: '9',
    questionKey: 'faq.items.chat_software.question',
    answerKey: 'faq.items.chat_software.answer',
    category: 'basic',
    icon: <CheckCircle className="h-4 w-4" />
  },
  {
    id: '10',
    questionKey: 'faq.items.programming.question',
    answerKey: 'faq.items.programming.answer',
    category: 'technical',
    icon: <Info className="h-4 w-4" />
  }
];

export default function FAQ() {
  const { t } = useLanguage();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 类别标签的多语言支持
  const getCategoryLabels = () => ({
    basic: { label: t('faq.categories.basic'), color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
    technical: { label: t('faq.categories.technical'), color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
    troubleshooting: { label: t('faq.categories.troubleshooting'), color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
    advanced: { label: t('faq.categories.advanced'), color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' }
  });

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };
  
  // 获取本地化的FAQ项目
  const getLocalizedFAQItems = () => {
    return faqItems.map(item => ({
      ...item,
      question: t(item.questionKey),
      answer: t(item.answerKey)
    }));
  };

  const categoryLabels = getCategoryLabels();
  const localizedFAQItems = getLocalizedFAQItems();

  const filteredFAQ = selectedCategory 
    ? localizedFAQItems.filter(item => item.category === selectedCategory)
    : localizedFAQItems;

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-500" />
            {t('faq.title')}
          </CardTitle>
          <p className="text-muted-foreground">
            {t('faq.subtitle')}
          </p>
        </CardHeader>
      </Card>

      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          {t('faq.all')}
        </Button>
        {Object.entries(categoryLabels).map(([key, value]) => (
          <Button
            key={key}
            variant={selectedCategory === key ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(key)}
          >
            {value.label}
          </Button>
        ))}
      </div>

      {/* FAQ列表 */}
      <div className="space-y-4">
        {filteredFAQ.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleExpanded(item.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                {item.icon}
                <div className="space-y-2 flex-1">
                  <h3 className="font-semibold text-left">{item.question}</h3>
                  <Badge 
                    variant="secondary" 
                    className={categoryLabels[item.category].color}
                  >
                    {categoryLabels[item.category].label}
                  </Badge>
                </div>
              </div>
                {expandedItems.includes(item.id) ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
            
            {expandedItems.includes(item.id) && (
              <CardContent className="pt-0">
                <div className="pl-7 pr-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* 联系方式 */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <AlertCircle className="h-12 w-12 mx-auto text-blue-500" />
            <div>
              <h3 className="font-semibold text-lg">{t('faq.contact.title')}</h3>
              <p className="text-muted-foreground mt-2">
                {t('faq.contact.desc')}
              </p>
            </div>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <span>{t('faq.contact.email')}</span>
              <span>•</span>
              <span>{t('faq.contact.github')}</span>
              <span>•</span>
              <span>{t('faq.contact.feedback')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}