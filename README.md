# Unicode 符号查找工具 🔍

一个现代化的 Unicode 符号查找和复制工具，支持多语言界面和丰富的符号分类。基于 Next.js 15 构建，提供流畅的用户体验和强大的搜索功能。

## ✨ 主要功能

### 🎯 核心功能
- **符号搜索**：支持按名称、Unicode 编码、分类快速搜索符号
- **一键复制**：点击即可复制符号到剪贴板，支持多种复制格式
- **批量操作**：选择多个符号进行批量复制
- **收藏管理**：收藏常用符号，快速访问个人符号库
- **分类浏览**：22+ 个符号分类，涵盖数学、货币、表情等各个领域

### 🌍 多语言支持
- **中文**：简体中文界面和符号名称
- **English**：英文界面和符号描述
- **日本語**：日文界面和符号说明
- 动态语言切换，无需刷新页面

### 🎨 用户体验
- **响应式设计**：完美适配桌面端和移动端
- **暗黑模式**：支持明亮/暗黑主题切换
- **全局通知**：统一的 Toast 通知系统
- **快速导航**：分类导航和快速跳转功能
- **用户指南**：内置使用说明和常见问题解答

## 🚀 技术栈

- **框架**：[Next.js 15](https://nextjs.org) with App Router
- **运行时**：React 19 + TypeScript
- **样式**：[Tailwind CSS 4](https://tailwindcss.com) + CSS-in-JS
- **UI 组件**：[Radix UI](https://radix-ui.com) + [Lucide React](https://lucide.dev)
- **状态管理**：[Zustand](https://zustand-demo.pmnd.rs)
- **工具库**：Lodash + Class Variance Authority
- **构建工具**：Turbopack（Next.js 内置）

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局组件
│   ├── page.tsx           # 主页面
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── ui/               # 基础 UI 组件
│   ├── SymbolCard.tsx    # 符号卡片组件
│   ├── SearchBar.tsx     # 搜索栏组件
│   ├── CategoryNav.tsx   # 分类导航组件
│   ├── Toast.tsx         # 通知组件
│   └── ...               # 其他功能组件
├── contexts/             # React Context
│   ├── LanguageContext.tsx  # 语言上下文
│   └── ToastContext.tsx     # 通知上下文
├── data/                 # 数据文件
│   └── symbols.ts        # 符号数据定义
├── hooks/                # 自定义 Hooks
├── lib/                  # 工具函数
├── store/                # 状态管理
│   └── favoritesStore.ts # 收藏功能状态
```

## 🛠️ 安装和使用

### 环境要求
- Node.js 18.17 或更高版本
- npm、yarn、pnpm 或 bun 包管理器

### 安装依赖
```bash
npm install
# 或
yarn install
# 或
pnpm install
# 或
bun install
```

### 启动开发服务器
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本
```bash
npm run build
npm run start
```

## 📊 符号分类

项目包含 22 个主要符号分类，涵盖 600+ 个常用 Unicode 符号：

| 分类 | 描述 | 示例符号 |
|------|------|----------|
| 表情符号 | 各种表情和手势 | 😀 😍 👍 ❤️ |
| 数学符号 | 数学运算和逻辑符号 | + − × ÷ ∞ ∑ |
| 货币符号 | 各国货币符号 | $ € ¥ £ ₹ |
| 箭头符号 | 方向指示符号 | ← → ↑ ↓ ⇒ |
| 几何图形 | 基本几何形状 | ○ □ △ ◆ ★ |
| 标点符号 | 标点和语法符号 | " " ' ' … — |
| 技术符号 | 技术和工程符号 | ⚡ ⚙️ 🔧 💻 |
| 天气符号 | 天气相关符号 | ☀️ ☁️ ⛈️ ❄️ |
| ... | ... | ... |

## 🎮 使用指南

### 基本操作
1. **搜索符号**：在搜索框中输入关键词或 Unicode 编码
2. **分类浏览**：点击分类标签查看特定类型的符号
3. **复制符号**：点击符号卡片即可复制到剪贴板
4. **收藏符号**：点击星形图标将符号添加到收藏夹
5. **批量复制**：选择多个符号后使用批量复制功能

### 高级功能
- **多格式复制**：支持复制符号本身、Unicode 编码、HTML 实体等
- **快速导航**：使用快速导航栏在不同分类间跳转
- **主题切换**：点击主题切换按钮在明亮/暗黑模式间切换
- **语言切换**：使用语言切换器改变界面语言

## 📡 数据 API

项目提供多种方式访问符号数据，支持不同应用场景：

### JSON 数据文件
```bash
# 获取所有数据
GET /data/unicode-symbols.json

# 获取符号列表
GET /data/symbols.json

# 获取分类列表
GET /data/categories.json

# 获取特定分类的符号
GET /data/categories/{categoryId}.json

# 获取统计信息
GET /data/stats.json
```

### REST API 接口
```bash
# 获取所有符号
GET /api/symbols

# 获取所有分类
GET /api/categories

# 获取特定分类的符号
GET /api/categories/{categoryId}
```

### 使用示例
```javascript
// 获取所有符号数据
fetch('/data/unicode-symbols.json')
  .then(response => response.json())
  .then(data => {
    console.log(`加载了 ${data.symbols.length} 个符号`);
  });

// 获取数学符号
fetch('/api/categories/mathematical')
  .then(response => response.json())
  .then(data => {
    console.log('数学符号:', data.symbols);
  });
```

详细的数据使用指南请参考：[数据使用文档](docs/data-usage.md)

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发流程
1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add some amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

### 代码规范
- 使用 TypeScript 进行类型安全开发
- 遵循 ESLint 配置的代码风格
- 组件使用函数式组件和 Hooks
- 保持代码简洁和可读性

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔗 相关链接

- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 功能和 API
- [React 文档](https://react.dev) - 学习 React 开发
- [Tailwind CSS](https://tailwindcss.com) - 实用优先的 CSS 框架
- [Unicode 标准](https://unicode.org) - Unicode 字符标准

---

**Unicode 符号查找工具** - 让符号查找变得简单高效 ✨
