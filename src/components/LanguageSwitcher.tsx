'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Check } from 'lucide-react';
import { useLanguage, LANGUAGE_CONFIG, SUPPORTED_LANGUAGES, type Language } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  const currentLanguage = LANGUAGE_CONFIG[language];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-sm font-medium"
          title={t('nav.language') as string}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {currentLanguage?.flag} {currentLanguage?.nativeName}
          </span>
          <span className="sm:hidden">
            {currentLanguage?.flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const langConfig = LANGUAGE_CONFIG[lang];
          const isActive = language === lang;
          
          return (
            <DropdownMenuItem
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`flex items-center justify-between cursor-pointer ${
                isActive ? 'bg-accent text-accent-foreground' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{langConfig.flag}</span>
                <div className="flex flex-col items-start">
                  <span className="font-medium">{langConfig.nativeName}</span>
                  <span className="text-xs text-muted-foreground">
                    {langConfig.name}
                  </span>
                </div>
              </div>
              {isActive && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}