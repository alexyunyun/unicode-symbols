'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ onSearch, placeholder = "搜索特殊符号、名称或Unicode...", className }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto", className)}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        className="pl-10 pr-4 py-3 text-base rounded-lg border-2 focus:border-primary transition-colors"
      />
      {query && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <button
            onClick={() => {
              setQuery('');
              onSearch('');
            }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}