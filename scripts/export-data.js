#!/usr/bin/env node

/**
 * 数据导出脚本
 * 将 TypeScript 数据文件转换为 JSON 格式，便于其他应用使用
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 动态导入 TypeScript 数据
async function exportData() {
  try {
    // 使用动态导入来加载 ES 模块
    const { symbols, categories } = await import('../src/data/symbols.ts');
    
    // 确保输出目录存在
    const outputDir = path.join(__dirname, '../public/data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 导出分类数据
    const categoriesPath = path.join(outputDir, 'categories.json');
    fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2), 'utf8');
    console.log(`✅ 分类数据已导出到: ${categoriesPath}`);

    // 导出符号数据
    const symbolsPath = path.join(outputDir, 'symbols.json');
    fs.writeFileSync(symbolsPath, JSON.stringify(symbols, null, 2), 'utf8');
    console.log(`✅ 符号数据已导出到: ${symbolsPath}`);

    // 创建合并的数据文件
    const combinedData = {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      categories,
      symbols,
      meta: {
        totalCategories: categories.length,
        totalSymbols: symbols.length,
        languages: ['zh', 'en', 'ja']
      }
    };

    const combinedPath = path.join(outputDir, 'unicode-symbols.json');
    fs.writeFileSync(combinedPath, JSON.stringify(combinedData, null, 2), 'utf8');
    console.log(`✅ 合并数据已导出到: ${combinedPath}`);

    // 创建压缩版本
    const minifiedPath = path.join(outputDir, 'unicode-symbols.min.json');
    fs.writeFileSync(minifiedPath, JSON.stringify(combinedData), 'utf8');
    console.log(`✅ 压缩数据已导出到: ${minifiedPath}`);

    // 按分类分组导出
    const categoriesDir = path.join(outputDir, 'categories');
    if (!fs.existsSync(categoriesDir)) {
      fs.mkdirSync(categoriesDir, { recursive: true });
    }

    categories.forEach(category => {
      const categorySymbols = symbols.filter(symbol => symbol.category === category.id);
      const categoryData = {
        category,
        symbols: categorySymbols,
        count: categorySymbols.length
      };
      
      const categoryPath = path.join(categoriesDir, `${category.id}.json`);
      fs.writeFileSync(categoryPath, JSON.stringify(categoryData, null, 2), 'utf8');
    });

    console.log(`✅ 按分类分组的数据已导出到: ${categoriesDir}`);

    // 生成统计信息
    const stats = {
      totalCategories: categories.length,
      totalSymbols: symbols.length,
      symbolsByCategory: categories.map(category => ({
        id: category.id,
        name: category.name,
        count: symbols.filter(symbol => symbol.category === category.id).length
      })),
      languages: ['zh', 'en', 'ja'],
      exportTime: new Date().toISOString()
    };

    const statsPath = path.join(outputDir, 'stats.json');
    fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2), 'utf8');
    console.log(`✅ 统计信息已导出到: ${statsPath}`);

    console.log('\n🎉 数据导出完成！');
    console.log(`📊 总计: ${stats.totalCategories} 个分类, ${stats.totalSymbols} 个符号`);

  } catch (error) {
    console.error('❌ 导出失败:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  exportData();
}

export { exportData };