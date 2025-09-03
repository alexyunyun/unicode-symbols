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
  question: string;
  answer: string;
  category: 'basic' | 'technical' | 'troubleshooting' | 'advanced';
  icon: React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: '为什么有些符号在我的设备上显示不正常？',
    answer: '这通常是因为您的设备或浏览器不支持某些Unicode符号。建议更新浏览器到最新版本，或在现代设备上使用。iOS和Android设备通常有更好的Unicode支持。',
    category: 'troubleshooting',
    icon: <Smartphone className="h-4 w-4" />
  },
  {
    id: '2',
    question: '复制的符号粘贴后变成了方框或问号？',
    answer: '这表示目标应用程序或字体不支持该Unicode字符。尝试使用HTML实体或CSS格式复制，或者在目标应用中选择支持Unicode的字体（如Arial Unicode MS、Noto Sans等）。',
    category: 'troubleshooting',
    icon: <Copy className="h-4 w-4" />
  },
  {
    id: '3',
    question: '如何在网页中使用这些符号？',
    answer: '您可以直接粘贴符号，或使用HTML实体格式（如&#8364;表示€）。对于CSS，可以使用content属性。建议查看我们提供的多种复制格式选项。',
    category: 'technical',
    icon: <Globe className="h-4 w-4" />
  },
  {
    id: '4',
    question: 'LaTeX格式是做什么用的？',
    answer: 'LaTeX格式用于学术论文和数学公式排版。例如，符号∑可以复制为\\sum，π可以复制为\\pi。这些命令可以直接在LaTeX文档中使用。',
    category: 'advanced',
    icon: <Info className="h-4 w-4" />
  },
  {
    id: '5',
    question: '常用符号保存在哪里？会丢失吗？',
    answer: '常用符号保存在浏览器的本地存储中，不会上传到服务器。如果清除浏览器数据或使用无痕模式，这些设置会丢失。建议定期导出重要的符号列表。',
    category: 'basic',
    icon: <HelpCircle className="h-4 w-4" />
  },
  {
    id: '6',
    question: '如何快速找到我需要的符号？',
    answer: '使用搜索功能是最快的方法。您可以搜索符号的中文名称、英文名称、Unicode码点，甚至直接输入符号本身。也可以通过分类浏览相关符号。',
    category: 'basic',
    icon: <Search className="h-4 w-4" />
  },
  {
    id: '7',
    question: '批量复制功能如何使用？',
    answer: '按住Ctrl键（Mac上是Cmd键）点击多个符号进行选择，然后在底部的批量操作栏中选择复制格式。这样可以一次性复制多个符号。',
    category: 'advanced',
    icon: <Copy className="h-4 w-4" />
  },
  {
    id: '8',
    question: '为什么搜索结果不准确？',
    answer: '搜索功能支持模糊匹配，会在符号名称、Unicode码点和分类中查找。如果结果不准确，尝试使用更具体的关键词，或者使用英文名称搜索。',
    category: 'troubleshooting',
    icon: <Search className="h-4 w-4" />
  },
  {
    id: '9',
    question: '这些符号在微信、QQ等聊天软件中能正常显示吗？',
    answer: '大部分基础Unicode符号（如表情符号、数学符号）在现代聊天软件中都能正常显示。但一些特殊符号可能会被转换或显示异常，建议先测试。',
    category: 'basic',
    icon: <CheckCircle className="h-4 w-4" />
  },
  {
    id: '10',
    question: '如何在编程中使用这些符号？',
    answer: '我们提供了JavaScript、Python、Java等多种编程语言的格式。例如，在JavaScript中可以使用"\\u2764"表示❤️。具体使用方法请参考对应的复制格式。',
    category: 'technical',
    icon: <Info className="h-4 w-4" />
  }
];

export default function FAQ() {
  const { t } = useLanguage();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 动态生成FAQ数据，使用多语言翻译
  const getFAQData = (): FAQItem[] => [
    {
      id: '1',
      question: '为什么有些符号在我的设备上显示不正常？',
      answer: '这通常是因为您的设备或浏览器不支持某些Unicode符号。建议更新浏览器到最新版本，或在现代设备上使用。iOS和Android设备通常有更好的Unicode支持。',
      category: 'troubleshooting',
      icon: <Smartphone className="h-4 w-4" />
    },
    // ... 其他FAQ项目保持不变，但会被全新的多语言版本替换
  ];

  // 类别标签的多语言支持
  const getCategoryLabels = () => ({
    basic: { label: t('faq.categories.basic'), color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
    technical: { label: t('faq.categories.technical'), color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
    troubleshooting: { label: t('faq.categories.troubleshooting'), color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
    advanced: { label: t('faq.categories.advanced'), color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' }
  });

  const currentFAQData = getFAQData();
  const categoryLabels = getCategoryLabels();

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQ = selectedCategory 
    ? currentFAQData.filter(item => item.category === selectedCategory)
    : currentFAQData;

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
              <h3 className="font-semibold text-lg">还有其他问题？</h3>
              <p className="text-muted-foreground mt-2">
                如果以上FAQ没有解决您的问题，欢迎通过以下方式联系我们：
              </p>
            </div>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <span>📧 support@unicode-symbols.com</span>
              <span>•</span>
              <span>🐛 GitHub Issues</span>
              <span>•</span>
              <span>💬 在线反馈</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}