'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Copy, Check, ChevronDown } from 'lucide-react';
import { Symbol } from '@/data/symbols';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface CopyDropdownProps {
  symbol: Symbol;
  className?: string;
}

interface CopyFormat {
  label: string;
  value: string;
  description: string;
}

export default function CopyDropdown({ symbol, className }: CopyDropdownProps) {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState<string | null>(null);

  // 生成各种格式的复制内容
  const getFormats = (sym: Symbol, lang: string): CopyFormat[] => [
    {
      label: t('copy.symbol'),
      value: sym.symbol,
      description: '直接复制符号',
    },
    {
      label: t('copy.unicode'),
      value: sym.unicode,
      description: 'Unicode编码 (U+XXXX)',
    },
    {
      label: 'Unicode十进制',
      value: `${parseInt(sym.unicode.replace('U+', ''), 16)}`,
      description: 'Unicode十进制数值',
    },
    {
      label: 'Unicode十六进制',
      value: `0x${sym.unicode.replace('U+', '').toUpperCase()}`,
      description: 'Unicode十六进制数值',
    },
    {
      label: t('copy.html'),
      value: `&#${parseInt(sym.unicode.replace('U+', ''), 16)};`,
      description: 'HTML数字实体',
    },
    {
      label: 'HTML十六进制',
      value: `&#x${sym.unicode.replace('U+', '').toLowerCase()};`,
      description: 'HTML十六进制实体',
    },
    {
      label: t('copy.css'),
      value: `content: "\\${sym.unicode.replace('U+', '').toLowerCase()}";`,
      description: 'CSS content属性',
    },
    {
      label: t('copy.javascript'),
      value: `"\\u{${sym.unicode.replace('U+', '')}}"`,
      description: 'JavaScript Unicode转义',
    },
    {
      label: t('copy.python'),
      value: `'\\u${sym.unicode.replace('U+', '').padStart(4, '0')}'`,
      description: 'Python Unicode字符串',
    },
    {
      label: t('copy.java'),
      value: `"\\u${sym.unicode.replace('U+', '').padStart(4, '0')}"`,
      description: 'Java/C# Unicode转义',
    },
    {
      label: t('copy.latex'),
      value: getLatexCommand(sym),
      description: 'LaTeX数学符号',
    },
    {
      label: t('copy.markdown'),
      value: `\`${sym.symbol}\` (${
        lang === 'en' && sym.name_en
          ? sym.name_en
          : lang === 'ja' && sym.name_ja
          ? sym.name_ja
          : sym.name
      })`,
      description: 'Markdown格式',
    },
    {
      label: t('copy.xml'),
      value: `&#${parseInt(sym.unicode.replace('U+', ''), 16)};`,
      description: 'XML/SVG实体',
    },
    {
      label: t('copy.json'),
      value: `"\\u${sym.unicode.replace('U+', '').padStart(4, '0')}"`,
      description: 'JSON Unicode转义',
    },
  ];

  // 获取LaTeX命令
  function getLatexCommand(sym: Symbol): string {
    const latexMap: Record<string, string> = {
      α: '\\alpha',
      β: '\\beta',
      γ: '\\gamma',
      δ: '\\delta',
      ε: '\\epsilon',
      ζ: '\\zeta',
      η: '\\eta',
      θ: '\\theta',
      ι: '\\iota',
      κ: '\\kappa',
      λ: '\\lambda',
      μ: '\\mu',
      ν: '\\nu',
      ξ: '\\xi',
      ο: '\\omicron',
      π: '\\pi',
      ρ: '\\rho',
      σ: '\\sigma',
      τ: '\\tau',
      υ: '\\upsilon',
      φ: '\\phi',
      χ: '\\chi',
      ψ: '\\psi',
      ω: '\\omega',
      Α: '\\Alpha',
      Β: '\\Beta',
      Γ: '\\Gamma',
      Δ: '\\Delta',
      Ε: '\\Epsilon',
      Ζ: '\\Zeta',
      Η: '\\Eta',
      Θ: '\\Theta',
      Ι: '\\Iota',
      Κ: '\\Kappa',
      Λ: '\\Lambda',
      Μ: '\\Mu',
      Ν: '\\Nu',
      Ξ: '\\Xi',
      Ο: '\\Omicron',
      Π: '\\Pi',
      Ρ: '\\Rho',
      Σ: '\\Sigma',
      Τ: '\\Tau',
      Υ: '\\Upsilon',
      Φ: '\\Phi',
      Χ: '\\Chi',
      Ψ: '\\Psi',
      Ω: '\\Omega',
      '∑': '\\sum',
      '∏': '\\prod',
      '∫': '\\int',
      '∬': '\\iint',
      '∭': '\\iiint',
      '∮': '\\oint',
      '√': '\\sqrt{}',
      '∞': '\\infty',
      '∂': '\\partial',
      '∇': '\\nabla',
      '±': '\\pm',
      '∓': '\\mp',
      '×': '\\times',
      '÷': '\\div',
      '≤': '\\leq',
      '≥': '\\geq',
      '≠': '\\neq',
      '≈': '\\approx',
      '≡': '\\equiv',
      '∈': '\\in',
      '∉': '\\notin',
      '∀': '\\forall',
      '∃': '\\exists',
      '∅': '\\emptyset',
      '∩': '\\cap',
      '∪': '\\cup',
      '⊂': '\\subset',
      '⊃': '\\supset',
      '⊆': '\\subseteq',
      '⊇': '\\supseteq',
      '∧': '\\land',
      '∨': '\\lor',
      '¬': '\\lnot',
      '→': '\\rightarrow',
      '←': '\\leftarrow',
      '↔': '\\leftrightarrow',
      '⇒': '\\Rightarrow',
      '⇐': '\\Leftarrow',
      '⇔': '\\Leftrightarrow',
    };

    return latexMap[sym.symbol] || `\\text{${sym.symbol}}`;
  }

  const handleCopy = async (format: CopyFormat) => {
    try {
      await navigator.clipboard.writeText(format.value);
      setCopied(format.label);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error(t('copy.failed') || '复制失败:', err);
    }
  };

  const formats = getFormats(symbol, language);
  console.log(formats);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={copied ? 'default' : 'outline'}
          size="sm"
          className={cn(
            'w-full transition-all duration-200 cursor-pointer text-xs h-auto min-h-7 py-1 border-2',
            copied
              ? 'bg-green-500 border-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:border-green-600 dark:text-white dark:hover:bg-green-700'
              : 'hover:bg-accent hover:text-accent-foreground hover:border-primary/50 dark:hover:bg-accent dark:hover:text-accent-foreground',
            className,
          )}
        >
          {copied ? (
            <>
              <Check className="w-2.5 h-2.5 mr-1" />
              {t('copy.success')}
            </>
          ) : (
            <>
              <Copy className="w-2.5 h-2.5 mr-1" />
              {t('copy.symbol')}
              <ChevronDown className="w-2.5 h-2.5 ml-1" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 bg-background border-border shadow-lg dark:bg-popover dark:border-border"
        align="end"
      >
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-3 py-2">
          {t('copy.format.title')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* 常用格式 */}
        <DropdownMenuLabel className="text-xs font-semibold px-3 py-1 text-primary">
          {t('copy.format.common')}
        </DropdownMenuLabel>
        {formats.slice(0, 3).map((format) => (
          <DropdownMenuItem
            key={format.label}
            onClick={() => handleCopy(format)}
            className="cursor-pointer text-xs hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          >
            <div className="flex flex-col w-full">
              <span className="font-medium">{format.label}</span>
              <span className="text-xs text-muted-foreground truncate">
                {format.value}
              </span>
            </div>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {/* 编程语言 */}
        <DropdownMenuLabel className="text-xs font-semibold px-3 py-1 text-primary">
          {t('copy.format.programming')}
        </DropdownMenuLabel>
        {formats.slice(7, 10).map((format) => (
          <DropdownMenuItem
            key={format.label}
            onClick={() => handleCopy(format)}
            className="cursor-pointer text-xs hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          >
            <div className="flex flex-col w-full">
              <span className="font-medium">{format.label}</span>
              <span className="text-xs text-muted-foreground truncate">
                {format.value}
              </span>
            </div>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {/* Web开发 */}
        <DropdownMenuLabel className="text-xs font-semibold px-3 py-1 text-primary">
          {t('copy.format.web')}
        </DropdownMenuLabel>
        {[formats[4], formats[5], formats[6], formats[12]].map((format) => (
          <DropdownMenuItem
            key={format.label}
            onClick={() => handleCopy(format)}
            className="cursor-pointer text-xs hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          >
            <div className="flex flex-col w-full">
              <span className="font-medium">{format.label}</span>
              <span className="text-xs text-muted-foreground truncate">
                {format.value}
              </span>
            </div>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {/* 文档格式 */}
        <DropdownMenuLabel className="text-xs font-semibold px-3 py-1 text-primary">
          {t('copy.format.document')}
        </DropdownMenuLabel>
        {[formats[10], formats[11]].map((format) => (
          <DropdownMenuItem
            key={format.label}
            onClick={() => handleCopy(format)}
            className="cursor-pointer text-xs hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          >
            <div className="flex flex-col w-full">
              <span className="font-medium">{format.label}</span>
              <span className="text-xs text-muted-foreground truncate">
                {format.value}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
