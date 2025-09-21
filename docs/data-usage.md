# 数据使用指南

本项目提供多种方式来访问 Unicode 符号数据，支持不同的应用场景和技术栈。

## 📊 数据格式

### JSON 格式
项目自动生成多种 JSON 格式的数据文件，位于 `public/data/` 目录：

- `categories.json` - 符号分类数据
- `symbols.json` - 所有符号数据
- `unicode-symbols.json` - 完整数据（包含元信息）
- `unicode-symbols.min.json` - 压缩版本
- `stats.json` - 统计信息
- `categories/[id].json` - 按分类分组的数据

### TypeScript 格式
原始数据位于 `src/data/symbols.ts`，包含完整的类型定义。

## 🚀 使用方式

### 1. 直接访问 JSON 文件

```javascript
// 获取所有数据
fetch('/data/unicode-symbols.json')
  .then(response => response.json())
  .then(data => {
    console.log('分类:', data.categories);
    console.log('符号:', data.symbols);
  });

// 获取特定分类
fetch('/data/categories/mathematical.json')
  .then(response => response.json())
  .then(data => {
    console.log('数学符号:', data.symbols);
  });
```

### 2. 使用 API 接口

```javascript
// 获取所有符号
fetch('/api/symbols')
  .then(response => response.json())
  .then(symbols => console.log(symbols));

// 获取所有分类
fetch('/api/categories')
  .then(response => response.json())
  .then(categories => console.log(categories));

// 获取特定分类的符号
fetch('/api/categories/emoticons')
  .then(response => response.json())
  .then(data => {
    console.log('分类信息:', data.category);
    console.log('符号列表:', data.symbols);
  });
```

### 3. 使用数据加载工具（推荐）

```typescript
import { loadData, loadSymbolsByCategory, searchSymbols } from '@/lib/dataLoader';

// 从 TypeScript 加载（默认）
const { categories, symbols } = await loadData();

// 从 JSON 文件加载
const data = await loadData({ 
  source: 'json',
  baseUrl: 'https://your-domain.com'
});

// 从 API 加载
const apiData = await loadData({ 
  source: 'api',
  baseUrl: 'https://api.your-domain.com'
});

// 按分类加载
const mathSymbols = await loadSymbolsByCategory('mathematical');

// 搜索符号
const results = await searchSymbols('heart');
```

## 📋 数据结构

### Symbol 接口
```typescript
interface Symbol {
  id: string;           // 唯一标识符
  symbol: string;       // Unicode 符号
  name: string;         // 中文名称
  name_en?: string;     // 英文名称
  name_ja?: string;     // 日文名称
  unicode: string;      // Unicode 编码
  category: string;     // 所属分类
}
```

### SymbolCategory 接口
```typescript
interface SymbolCategory {
  id: string;               // 分类标识符
  name: string;             // 中文名称
  name_en?: string;         // 英文名称
  name_ja?: string;         // 日文名称
  description: string;      // 中文描述
  description_en?: string;  // 英文描述
  description_ja?: string;  // 日文描述
}
```

## 🔧 数据生成

### 自动生成
项目构建时会自动运行数据导出脚本：
```bash
npm run build  # 自动执行 prebuild 钩子
```

### 手动生成
```bash
npm run export-data
```

### 自定义导出脚本
```javascript
import { exportData } from './scripts/export-data.js';

// 导出所有数据
await exportData();
```

## 🌐 外部应用集成

### React 应用
```jsx
import { useState, useEffect } from 'react';

function UnicodeSymbols() {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    fetch('https://your-unicode-app.com/data/symbols.json')
      .then(response => response.json())
      .then(setSymbols);
  }, []);

  return (
    <div>
      {symbols.map(symbol => (
        <span key={symbol.id} title={symbol.name}>
          {symbol.symbol}
        </span>
      ))}
    </div>
  );
}
```

### Vue 应用
```vue
<template>
  <div>
    <span 
      v-for="symbol in symbols" 
      :key="symbol.id" 
      :title="symbol.name"
    >
      {{ symbol.symbol }}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      symbols: []
    };
  },
  async mounted() {
    const response = await fetch('https://your-unicode-app.com/data/symbols.json');
    this.symbols = await response.json();
  }
};
</script>
```

### Node.js 应用
```javascript
const fetch = require('node-fetch');

async function getUnicodeSymbols() {
  const response = await fetch('https://your-unicode-app.com/data/unicode-symbols.json');
  const data = await response.json();
  return data;
}

// 使用示例
getUnicodeSymbols().then(data => {
  console.log(`加载了 ${data.symbols.length} 个符号`);
});
```

### Python 应用
```python
import requests

def get_unicode_symbols():
    response = requests.get('https://your-unicode-app.com/data/unicode-symbols.json')
    return response.json()

# 使用示例
data = get_unicode_symbols()
print(f"加载了 {len(data['symbols'])} 个符号")
```

## 📈 性能优化

### 缓存策略
```typescript
// 启用缓存
const data = await loadData({ 
  source: 'json',
  cache: true 
});

// 清除缓存
import { clearCache } from '@/lib/dataLoader';
clearCache();
```

### 按需加载
```typescript
// 只加载需要的分类
const mathSymbols = await loadSymbolsByCategory('mathematical');

// 搜索特定符号
const heartSymbols = await searchSymbols('heart');
```

### CDN 部署
将 `public/data/` 目录部署到 CDN，提高访问速度：
```javascript
const data = await loadData({ 
  source: 'json',
  baseUrl: 'https://cdn.your-domain.com'
});
```

## 🔄 数据更新

### 添加新符号
1. 编辑 `src/data/symbols.ts`
2. 运行 `npm run export-data`
3. 提交更改

### 添加新分类
1. 在 `categories` 数组中添加新分类
2. 为符号分配新的 `category` 值
3. 重新导出数据

## 📝 许可证

数据文件遵循与项目相同的 MIT 许可证，可自由使用和分发。

## 🤝 贡献

欢迎提交新的符号数据或改进建议！请参考项目的贡献指南。