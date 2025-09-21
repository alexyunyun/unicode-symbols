/**
 * 数据加载工具
 * 支持从 JSON 和 TypeScript 两种格式加载符号数据
 */

import { Symbol, SymbolCategory } from '@/data/symbols';

// 数据源类型
export type DataSource = 'typescript' | 'json' | 'api';

// 数据加载配置
export interface DataLoaderConfig {
  source: DataSource;
  baseUrl?: string; // 用于 API 或 JSON 文件的基础 URL
  cache?: boolean;  // 是否启用缓存
}

// 缓存存储
const cache = new Map<string, unknown>();

/**
 * 从 TypeScript 文件加载数据（默认方式）
 */
async function loadFromTypeScript(): Promise<{ categories: SymbolCategory[]; symbols: Symbol[] }> {
  const { categories, symbols } = await import('@/data/symbols');
  return { categories, symbols };
}

/**
 * 从 JSON 文件加载数据
 */
async function loadFromJSON(baseUrl: string = ''): Promise<{ categories: SymbolCategory[]; symbols: Symbol[] }> {
  const cacheKey = `json-${baseUrl}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as { categories: SymbolCategory[]; symbols: Symbol[] };
  }

  try {
    // 加载合并的数据文件
    const response = await fetch(`${baseUrl}/data/unicode-symbols.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const result = {
      categories: data.categories,
      symbols: data.symbols
    };
    
    cache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.warn('Failed to load from JSON, falling back to TypeScript:', error);
    return loadFromTypeScript();
  }
}

/**
 * 从 API 加载数据
 */
async function loadFromAPI(baseUrl: string): Promise<{ categories: SymbolCategory[]; symbols: Symbol[] }> {
  const cacheKey = `api-${baseUrl}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as { categories: SymbolCategory[]; symbols: Symbol[] };
  }

  try {
    const [categoriesResponse, symbolsResponse] = await Promise.all([
      fetch(`${baseUrl}/api/categories`),
      fetch(`${baseUrl}/api/symbols`)
    ]);

    if (!categoriesResponse.ok || !symbolsResponse.ok) {
      throw new Error('API request failed');
    }

    const [categories, symbols] = await Promise.all([
      categoriesResponse.json(),
      symbolsResponse.json()
    ]);

    const result = { categories, symbols };
    cache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.warn('Failed to load from API, falling back to TypeScript:', error);
    return loadFromTypeScript();
  }
}

/**
 * 按分类加载符号数据
 */
export async function loadSymbolsByCategory(
  categoryId: string,
  config: DataLoaderConfig = { source: 'typescript' }
): Promise<{ category: SymbolCategory; symbols: Symbol[] }> {
  const cacheKey = `category-${categoryId}-${config.source}`;
  
  if (config.cache !== false && cache.has(cacheKey)) {
    return cache.get(cacheKey) as { category: SymbolCategory; symbols: Symbol[] };
  }

  try {
    if (config.source === 'json') {
      // 从分类特定的 JSON 文件加载
      const response = await fetch(`${config.baseUrl || ''}/data/categories/${categoryId}.json`);
      if (response.ok) {
        const data = await response.json();
        const result = {
          category: data.category,
          symbols: data.symbols
        };
        
        if (config.cache !== false) {
          cache.set(cacheKey, result);
        }
        return result;
      }
    }
    
    // 回退到加载所有数据然后过滤
    const { categories, symbols } = await loadData(config);
    const category = categories.find(c => c.id === categoryId);
    const categorySymbols = symbols.filter(s => s.category === categoryId);
    
    if (!category) {
      throw new Error(`Category not found: ${categoryId}`);
    }
    
    const result = {
      category,
      symbols: categorySymbols
    };
    
    if (config.cache !== false) {
      cache.set(cacheKey, result);
    }
    return result;
  } catch (error) {
    console.error('Failed to load symbols by category:', error);
    throw error;
  }
}

/**
 * 主数据加载函数
 */
export async function loadData(
  config: DataLoaderConfig = { source: 'typescript' }
): Promise<{ categories: SymbolCategory[]; symbols: Symbol[] }> {
  switch (config.source) {
    case 'json':
      return loadFromJSON(config.baseUrl);
    case 'api':
      if (!config.baseUrl) {
        throw new Error('baseUrl is required for API data source');
      }
      return loadFromAPI(config.baseUrl);
    case 'typescript':
    default:
      return loadFromTypeScript();
  }
}

/**
 * 清除缓存
 */
export function clearCache(): void {
  cache.clear();
}

/**
 * 获取数据统计信息
 */
export async function getDataStats(
  config: DataLoaderConfig = { source: 'typescript' }
): Promise<{
  totalCategories: number;
  totalSymbols: number;
  symbolsByCategory: Array<{ id: string; name: string; count: number }>;
}> {
  if (config.source === 'json') {
    try {
      const response = await fetch(`${config.baseUrl || ''}/data/stats.json`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('Failed to load stats from JSON:', error);
    }
  }

  // 回退到计算统计信息
  const { categories, symbols } = await loadData(config);
  return {
    totalCategories: categories.length,
    totalSymbols: symbols.length,
    symbolsByCategory: categories.map(category => ({
      id: category.id,
      name: category.name,
      count: symbols.filter(symbol => symbol.category === category.id).length
    }))
  };
}

/**
 * 搜索符号
 */
export async function searchSymbols(
  query: string,
  config: DataLoaderConfig = { source: 'typescript' }
): Promise<Symbol[]> {
  const { symbols } = await loadData(config);
  const searchTerm = query.toLowerCase().trim();
  
  return symbols.filter(symbol => 
    symbol.name.toLowerCase().includes(searchTerm) ||
    symbol.name_en?.toLowerCase().includes(searchTerm) ||
    symbol.name_ja?.toLowerCase().includes(searchTerm) ||
    symbol.unicode.toLowerCase().includes(searchTerm) ||
    symbol.symbol.includes(searchTerm)
  );
}