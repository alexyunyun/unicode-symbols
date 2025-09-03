'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// 支持的语言
export const SUPPORTED_LANGUAGES = ['zh', 'en', 'ja'] as const;
export type Language = typeof SUPPORTED_LANGUAGES[number];

// 语言配置
export const LANGUAGE_CONFIG = {
  zh: {
    name: '中文',
    nativeName: '中文',
    flag: '🇨🇳',
    direction: 'ltr'
  },
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    direction: 'ltr'
  },
  ja: {
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    direction: 'ltr'
  }
} as const;

// 翻译数据
const TRANSLATIONS = {
  zh: {
    // 导航
    'nav.title': 'Unicode 符号大全',
    'nav.language': '语言',
    'nav.backToTop': '回到顶部',
    'nav.quickNav': '快速导航',
    
    // 主题
    'theme.dark': '切换到暗黑模式',
    'theme.light': '切换到亮色模式',
    
    // 区块标题
    'sections.symbols.title': '符号大全',
    'sections.symbols.description': '浏览和搜索所有 Unicode 符号，支持多种复制格式和批量操作',
    'sections.symbols.count': '{count} 个符号',
    'sections.symbols.count_unit': '符号',
    'sections.favorites.title': '常用符号',
    'sections.favorites.description': '管理您收藏的常用符号，数据保存在浏览器本地存储中',
    'sections.favorites.count_unit': '收藏',
    'common.items': '项目',
    'sections.guide.title': '使用说明',
    'sections.guide.description': '详细了解如何使用 Unicode 符号大全的各项功能',
    'sections.faq.title': '常见问题',
    'sections.faq.description': '常见问题解答，帮助您快速解决使用中遇到的问题',
    
    // 搜索
    'search.placeholder': '搜索特殊符号、名称或Unicode...',
    'search.tips.click': '提示：点击符号快速复制',
    'search.tips.dropdown': '点击 复制 ▼ 选择复制格式',
    'search.tips.multiSelect': '按住 Ctrl 点击多选',
    'search.tips.favorite': '点击 ★ 收藏符号',
    'search.tips.formats': '支持格式：Unicode、HTML、CSS、JavaScript、Python、Java、LaTeX、Markdown 等',
    'search.resultCount': '{count} 个符号',
    'search.noResults': '未找到匹配的符号',
    'search.tips.adjust': '请尝试调整搜索条件或选择其他分类',
    
    // 复制功能
    'copy.symbol': '复制符号',
    'copy.unicode': 'Unicode',
    'copy.html': 'HTML 实体',
    'copy.css': 'CSS 内容',
    'copy.javascript': 'JavaScript',
    'copy.python': 'Python',
    'copy.java': 'Java/C#',
    'copy.latex': 'LaTeX',
    'copy.markdown': 'Markdown',
    'copy.xml': 'XML/SVG',
    'copy.json': 'JSON',
    'copy.document': '文档格式',
    'copy.success': '已复制到剪贴板',
    'copy.failed': '复制失败',
    'copy.batch': '批量复制',
    'copy.clear': '清空选择',
    'copy.selected': '已选择 {count} 个符号',
    'copy.format.title': '复制格式选择',
    'copy.format.common': '常用格式',
    'copy.format.programming': '编程语言',
    'copy.format.web': 'Web开发',
    'copy.format.document': '文档格式',
    
    // 常用符号
    'favorites.add': '添加到常用',
    'favorites.remove': '从常用中移除',
    'favorites.empty': '暂无常用符号',
    'favorites.emptyDesc': '点击符号卡片上的 ★ 按钮来添加常用符号',
    'favorites.clear': '清空常用符号',
    'favorites.clearConfirm': '确定要清空所有常用符号吗？',
    
    // 提示信息
    'tips.usage.title': '💡 使用提示',
    'tips.usage.items': [
      '点击符号可以快速复制到剪贴板',
      '点击符号卡片右上角的 × 可以移除该符号',
      '常用符号数据保存在本地，清除浏览器数据会丢失'
    ],
    
    // 分类
    'categories.all': '全部',
    'categories.mathematical': '数学符号',
    'categories.currency': '货币符号',
    'categories.arrows': '箭头符号',
    'categories.punctuation': '标点符号',
    'categories.shapes': '几何图形',
    'categories.miscellaneous': '其他符号',
    'categories.emoticons': '表情符号',
    'categories.technical': '技术符号',
    'categories.weather': '天气符号',
    'categories.office': '办公符号',
    'categories.combination': '复选框和方框',
    'categories.regional': '各地区常用符号',
    'categories.legal': '法律商业符号',
    'categories.religious': '宗教文化符号',
    'categories.zodiac': '星座占星符号',
    'categories.gaming': '游戏娱乐符号',
    'categories.transport': '交通建筑符号',
    'categories.nature': '自然环境符号',
    'categories.food': '食物生活符号',
    'categories.sports': '运动健康符号',
    'categories.music': '音乐艺术符号',
    'categories.science': '科学工程符号',
    
    // 页脚
    'footer.features.title': '🎯 功能特色',
    'footer.features.items': [
      '665+ Unicode 符号',
      '22 个分类',
      '12 种复制格式'
    ],
    'footer.tech.title': '🚀 技术架构',
    'footer.tech.items': [
      'Next.js 15 + React 19',
      'TypeScript + Tailwind CSS',
      'shadcn/ui 组件库'
    ],
    'footer.support.title': '💫 支持平台',
    'footer.support.items': [
      '电脑、手机、平板',
      '现代浏览器',
      '暗黑/明亮主题'
    ],
    'footer.description': '🎆 快速复制 Unicode 符号 | 支持 {count}+ 个常用符号',
    'footer.made': 'Made with ❤️ using Next.js & shadcn/ui',
    
    // 使用指南
    'guide.quickStart.title': '快速入门',
    'guide.quickStart.search.title': '🔍 搜索符号',
    'guide.quickStart.search.items': [
      '在搜索框中输入符号名称或Unicode码',
      '支持中文、英文和符号本身搜索',
      '例如：搜索"心"、"heart"或"❤️"'
    ],
    'guide.quickStart.category.title': '📂 分类浏览',
    'guide.quickStart.category.items': [
      '点击分类标签快速筛选符号',
      '包含22个主要分类',
      '每个分类显示符号数量'
    ],
    'guide.copy.title': '复制功能详解',
    'guide.copy.quick.title': '快速复制',
    'guide.copy.quick.desc': '直接点击符号即可复制到剪贴板，简单快捷',
    'guide.copy.quick.code': '点击 → 复制 → 粘贴使用',
    'guide.copy.format.title': '格式复制',
    'guide.copy.format.desc': '点击"复制 ▼"按钮选择12种不同格式',
    'guide.copy.batch.title': '批量复制',
    'guide.copy.batch.desc': '按住Ctrl键点击多个符号进行批量复制',
    'guide.copy.batch.code': 'Ctrl + 点击 = 多选',
    'guide.copy.formats.title': '💡 支持的复制格式',
    'guide.copy.formats.items': [
      '原始符号', 'Unicode码点', 'HTML实体', 'CSS内容',
      'JavaScript', 'Python', 'Java/C#', 'LaTeX命令',
      'Markdown', 'XML/SVG', 'JSON格式', '文档格式'
    ],
    'guide.favorites.title': '常用符号管理',
    'guide.favorites.add.title': '添加常用符号',
    'guide.favorites.add.desc': '在任意符号卡片上点击 ⭐ 按钮，即可将符号添加到常用符号列表',
    'guide.favorites.add.action': '点击星标添加',
    'guide.favorites.manage.title': '管理常用符号',
    'guide.favorites.manage.desc': '在常用符号区域可以快速访问、复制或删除已保存的符号',
    'guide.favorites.manage.action': '本地存储',
    'guide.favorites.warning': '📌 常用符号保存在浏览器本地存储中，清除浏览器数据会丢失这些设置',
    'guide.shortcuts.title': '键盘快捷键',
    'guide.shortcuts.basic.title': '基础操作',
    'guide.shortcuts.basic.search': '搜索符号',
    'guide.shortcuts.basic.multiSelect': '选择多个符号',
    'guide.shortcuts.basic.clear': '清空搜索',
    'guide.shortcuts.advanced.title': '高级功能',
    'guide.shortcuts.advanced.theme': '切换主题',
    'guide.shortcuts.advanced.top': '回到顶部',
    'guide.shortcuts.advanced.nav': '快速导航',
    
    // 常见问题
    'faq.title': '常见问题解答',
    'faq.subtitle': '以下是用户最常遇到的问题和解决方案，如果您的问题不在列表中，欢迎反馈。',
    'faq.all': '全部问题',
    'faq.categories.basic': '基础问题',
    'faq.categories.technical': '技术问题',
    'faq.categories.troubleshooting': '故障排除',
    'faq.categories.advanced': '高级功能',
    
    // FAQ项目
    'faq.items.device_display.question': '为什么在手机上显示不完整或乱码？',
    'faq.items.device_display.answer': '这是正常现象，因为不同设备和字体对Unicode符号的支持程度不同。建议在电脑上使用，或确保手机系统和字体为最新版本。',
    'faq.items.copy_paste.question': '复制后粘贴到哪里无效？',
    'faq.items.copy_paste.answer': '请确保粘贴目标支持Unicode字符，如现代文本编辑器、办公软件等。部分老旧系统或软件可能不支持部分特殊符号。',
    'faq.items.web_usage.question': '可以在网页中直接使用这些符号吗？',
    'faq.items.web_usage.answer': '可以，所有符号都是标准Unicode字符，可直接在HTML、CSS、JavaScript中使用。对于特殊符号，建议使用HTML实体编码以确保兼容性。',
    'faq.items.latex.question': '支持LaTeX格式导出吗？',
    'faq.items.latex.answer': '支持，点击符号卡片上的"复制▼"按钮，选择"LaTeX"格式即可获得对应的LaTeX命令，如\\heartsuit、\\spadesuit等。',
    'faq.items.favorites_storage.question': '收藏的符号保存在哪里？',
    'faq.items.favorites_storage.answer': '收藏数据保存在浏览器本地存储中，不会上传到服务器。更换设备或清除浏览器数据会丢失收藏，请注意定期备份重要符号。',
    'faq.items.search_symbols.question': '如何快速找到需要的符号？',
    'faq.items.search_symbols.answer': '可以使用搜索功能输入符号名称、Unicode编码或直接粘贴符号进行查找。也可以通过分类筛选快速定位某一类符号。',
    'faq.items.batch_copy.question': '如何批量复制多个符号？',
    'faq.items.batch_copy.answer': '按住Ctrl键（Mac为Cmd键）点击多个符号卡片进行选择，底部会出现批量操作栏，点击"批量复制"按钮即可一次性复制所有选中符号。',
    'faq.items.search_accuracy.question': '搜索结果不准确怎么办？',
    'faq.items.search_accuracy.answer': '尝试使用更精确的关键词，或使用Unicode编码搜索。如果仍然找不到，可能该符号尚未收录，请通过反馈渠道告知我们。',
    'faq.items.chat_software.question': '在聊天软件中无法正常显示？',
    'faq.items.chat_software.answer': '部分聊天软件对特殊符号支持有限。建议先复制到文本编辑器确认符号正常，再尝试发送。不同平台的兼容性可能有所差异。',
    'faq.items.programming.question': '如何在编程中使用这些符号？',
    'faq.items.programming.answer': '提供多种编程语言格式：JavaScript(\\uXXXX)、Python(\\uXXXX)、Java(\\uXXXX)、C#(\\uXXXX)等。选择对应格式复制后直接在代码中使用。',
    
    // 联系方式
    'faq.contact.title': '联系我们',
    'faq.contact.desc': '如果您有任何问题、建议或发现符号错误，欢迎通过以下方式联系我们：',
    'faq.contact.email': '邮箱：support@unicode-symbols.com',
    'faq.contact.github': 'GitHub：github.com/unicode-symbols',
    'faq.contact.feedback': '问题反馈'
  },
  
  en: {
    // Navigation
    'nav.title': 'Unicode Symbols Collection',
    'nav.language': 'Language',
    'nav.backToTop': 'Back to Top',
    'nav.quickNav': 'Quick Navigation',
    
    // Theme
    'theme.dark': 'Switch to dark mode',
    'theme.light': 'Switch to light mode',
    
    // Section titles
    'sections.symbols.title': 'Symbol Collection',
    'sections.symbols.description': 'Browse and search all Unicode symbols with multiple copy formats and batch operations',
    'sections.symbols.count': '{count} symbols',
    'sections.symbols.count_unit': 'symbols',
    'sections.favorites.title': 'Favorite Symbols',
    'sections.favorites.description': 'Manage your favorite symbols, data is saved in browser local storage',
    'sections.favorites.count_unit': 'favorites',
    'common.items': 'items',
    'sections.guide.title': 'User Guide',
    'sections.guide.description': 'Learn how to use all the features of Unicode Symbols Collection',
    'sections.faq.title': 'FAQ',
    'sections.faq.description': 'Frequently asked questions to help you quickly solve problems',
    
    // Search
    'search.placeholder': 'Search symbols, names or Unicode...',
    'search.tips.click': 'Tip: Click symbol to copy quickly',
    'search.tips.dropdown': 'Click Copy ▼ to select copy format',
    'search.tips.multiSelect': 'Hold Ctrl and click for multi-selection',
    'search.tips.favorite': 'Click ★ to favorite symbol',
    'search.tips.formats': 'Supported formats: Unicode, HTML, CSS, JavaScript, Python, Java, LaTeX, Markdown, etc.',
    'search.resultCount': '{count} symbols',
    'search.noResults': 'No matching symbols found',
    'search.tips.adjust': 'Please try adjusting search criteria or selecting another category',
    
    // Copy functionality
    'copy.symbol': 'Copy Symbol',
    'copy.unicode': 'Unicode',
    'copy.html': 'HTML Entity',
    'copy.css': 'CSS Content',
    'copy.javascript': 'JavaScript',
    'copy.python': 'Python',
    'copy.java': 'Java/C#',
    'copy.latex': 'LaTeX',
    'copy.markdown': 'Markdown',
    'copy.xml': 'XML/SVG',
    'copy.json': 'JSON',
    'copy.document': 'Document Format',
    'copy.success': 'Copied to clipboard',
    'copy.failed': 'Failed to copy',
    'copy.batch': 'Batch Copy',
    'copy.clear': 'Clear Selection',
    'copy.selected': '{count} symbols selected',
    'copy.format.title': 'Copy Format Selection',
    'copy.format.common': 'Common Formats',
    'copy.format.programming': 'Programming Languages',
    'copy.format.web': 'Web Development',
    'copy.format.document': 'Document Formats',
    
    // Favorites
    'favorites.add': 'Add to Favorites',
    'favorites.remove': 'Remove from Favorites',
    'favorites.empty': 'No favorite symbols',
    'favorites.emptyDesc': 'Click the ★ button on symbol cards to add favorites',
    'favorites.clear': 'Clear Favorites',
    'favorites.clearConfirm': 'Are you sure you want to clear all favorite symbols?',
    
    // Tips
    'tips.usage.title': '💡 Usage Tips',
    'tips.usage.items': [
      'Click symbols to quickly copy to clipboard',
      'Click × in the top-right corner of symbol cards to remove',
      'Favorite symbols are saved locally, clearing browser data will lose them'
    ],
    
    // Categories
    'categories.all': 'All',
    'categories.mathematical': 'Mathematical',
    'categories.currency': 'Currency',
    'categories.arrows': 'Arrows',
    'categories.punctuation': 'Punctuation',
    'categories.shapes': 'Shapes',
    'categories.miscellaneous': 'Miscellaneous',
    'categories.emoticons': 'Emoticons',
    'categories.technical': 'Technical',
    'categories.weather': 'Weather',
    'categories.office': 'Office',
    'categories.combination': 'Checkboxes & Boxes',
    'categories.regional': 'Regional',
    'categories.legal': 'Legal & Business',
    'categories.religious': 'Religious & Cultural',
    'categories.zodiac': 'Zodiac & Astrology',
    'categories.gaming': 'Gaming & Entertainment',
    'categories.transport': 'Transport & Architecture',
    'categories.nature': 'Nature & Environment',
    'categories.food': 'Food & Lifestyle',
    'categories.sports': 'Sports & Health',
    'categories.music': 'Music & Arts',
    'categories.science': 'Science & Engineering',
    'categories.geometry': 'Geometry',
    'categories.latin': 'Latin Letters',
    'categories.emoji': 'Emoji',
    
    // Footer
    'footer.features.title': '🎯 Features',
    'footer.features.items': [
      '665+ Unicode symbols',
      '22 categories',
      '12 copy formats'
    ],
    'footer.tech.title': '🚀 Tech Stack',
    'footer.tech.items': [
      'Next.js 15 + React 19',
      'TypeScript + Tailwind CSS',
      'shadcn/ui components'
    ],
    'footer.support.title': '💫 Supported Platforms',
    'footer.support.items': [
      'Desktop, mobile, tablet',
      'Modern browsers',
      'Dark/light themes'
    ],
    'footer.description': '🎆 Quick copy Unicode symbols | Support {count}+ common symbols',
    'footer.made': 'Made with ❤️ using Next.js & shadcn/ui',
    
    // User Guide
    'guide.quickStart.title': 'Quick Start',
    'guide.quickStart.search.title': '🔍 Search Symbols',
    'guide.quickStart.search.items': [
      'Enter symbol names or Unicode codes in the search box',
      'Supports Chinese, English and symbol search',
      'For example: search "heart", "心" or "❤️"'
    ],
    'guide.quickStart.category.title': '📂 Browse Categories',
    'guide.quickStart.category.items': [
      'Click category tags to quickly filter symbols',
      'Contains 22 main categories',
      'Each category shows symbol count'
    ],
    'guide.copy.title': 'Copy Feature Details',
    'guide.copy.quick.title': 'Quick Copy',
    'guide.copy.quick.desc': 'Click symbols directly to copy to clipboard, simple and fast',
    'guide.copy.quick.code': 'Click → Copy → Paste to use',
    'guide.copy.format.title': 'Format Copy',
    'guide.copy.format.desc': 'Click "Copy ▼" button to select from 12 different formats',
    'guide.copy.batch.title': 'Batch Copy',
    'guide.copy.batch.desc': 'Hold Ctrl and click multiple symbols for batch copying',
    'guide.copy.batch.code': 'Ctrl + Click = Multi-select',
    'guide.copy.formats.title': '💡 Supported Copy Formats',
    'guide.copy.formats.items': [
      'Raw Symbol', 'Unicode Code', 'HTML Entity', 'CSS Content',
      'JavaScript', 'Python', 'Java/C#', 'LaTeX Command',
      'Markdown', 'XML/SVG', 'JSON Format', 'Document Format'
    ],
    'guide.favorites.title': 'Favorite Symbol Management',
    'guide.favorites.add.title': 'Add Favorite Symbols',
    'guide.favorites.add.desc': 'Click the ⭐ button on any symbol card to add it to favorites',
    'guide.favorites.add.action': 'Click star to add',
    'guide.favorites.manage.title': 'Manage Favorite Symbols',
    'guide.favorites.manage.desc': 'Quick access, copy or delete saved symbols in the favorites section',
    'guide.favorites.manage.action': 'Local Storage',
    'guide.favorites.warning': '📌 Favorite symbols are saved in browser local storage, clearing browser data will lose these settings',
    'guide.shortcuts.title': 'Keyboard Shortcuts',
    'guide.shortcuts.basic.title': 'Basic Operations',
    'guide.shortcuts.basic.search': 'Search symbols',
    'guide.shortcuts.basic.multiSelect': 'Select multiple symbols',
    'guide.shortcuts.basic.clear': 'Clear search',
    'guide.shortcuts.advanced.title': 'Advanced Features',
    'guide.shortcuts.advanced.theme': 'Toggle theme',
    'guide.shortcuts.advanced.top': 'Back to top',
    'guide.shortcuts.advanced.nav': 'Quick navigation',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Here are the most common questions and solutions from users. If your question is not listed, feel free to provide feedback.',
    'faq.all': 'All Questions',
    'faq.categories.basic': 'Basic Questions',
    'faq.categories.technical': 'Technical Questions',
    'faq.categories.troubleshooting': 'Troubleshooting',
    'faq.categories.advanced': 'Advanced Features',
    
    // FAQ Items
    'faq.items.device_display.question': 'Why do symbols display incompletely or garbled on mobile?',
    'faq.items.device_display.answer': 'This is normal because different devices and fonts have varying levels of support for Unicode symbols. It is recommended to use on a computer, or ensure your mobile system and fonts are up to date.',
    'faq.items.copy_paste.question': 'Why does pasting not work after copying?',
    'faq.items.copy_paste.answer': 'Ensure the paste target supports Unicode characters, such as modern text editors and office software. Some older systems or software may not support certain special symbols.',
    'faq.items.web_usage.question': 'Can these symbols be used directly on web pages?',
    'faq.items.web_usage.answer': 'Yes, all symbols are standard Unicode characters that can be used directly in HTML, CSS, and JavaScript. For special symbols, it is recommended to use HTML entity encoding to ensure compatibility.',
    'faq.items.latex.question': 'Is LaTeX format export supported?',
    'faq.items.latex.answer': 'Yes, click the "Copy▼" button on the symbol card and select the "LaTeX" format to get the corresponding LaTeX command, such as \\heartsuit, \\spadesuit, etc.',
    'faq.items.favorites_storage.question': 'Where are favorite symbols saved?',
    'faq.items.favorites_storage.answer': 'Favorite data is saved in browser local storage and is not uploaded to the server. Switching devices or clearing browser data will lose favorites, so please back up important symbols regularly.',
    'faq.items.search_symbols.question': 'How to quickly find the symbols you need?',
    'faq.items.search_symbols.answer': 'You can use the search function to enter symbol names, Unicode codes, or paste symbols directly to find them. You can also quickly locate a category of symbols through category filtering.',
    'faq.items.batch_copy.question': 'How to copy multiple symbols in batch?',
    'faq.items.batch_copy.answer': 'Hold down the Ctrl key (Cmd key on Mac) and click multiple symbol cards to select them. A batch operation bar will appear at the bottom. Click the "Batch Copy" button to copy all selected symbols at once.',
    'faq.items.search_accuracy.question': 'What if the search results are inaccurate?',
    'faq.items.search_accuracy.answer': 'Try using more precise keywords or search by Unicode code. If you still cannot find it, the symbol may not be included yet. Please let us know through the feedback channel.',
    'faq.items.chat_software.question': 'Why don\'t symbols display properly in chat software?',
    'faq.items.chat_software.answer': 'Some chat software has limited support for special symbols. It is recommended to first copy to a text editor to confirm the symbol is normal, then try to send it. Compatibility may vary across different platforms.',
    'faq.items.programming.question': 'How to use these symbols in programming?',
    'faq.items.programming.answer': 'Multiple programming language formats are provided: JavaScript(\\uXXXX), Python(\\uXXXX), Java(\\uXXXX), C#(\\uXXXX), etc. Select the corresponding format, copy it, and use it directly in your code.',
    
    // Contact
    'faq.contact.title': 'Contact Us',
    'faq.contact.desc': 'If you have any questions, suggestions, or find symbol errors, please feel free to contact us through the following methods:',
    'faq.contact.email': 'Email: support@unicode-symbols.com',
    'faq.contact.github': 'GitHub: github.com/unicode-symbols',
    'faq.contact.feedback': 'Feedback'
  },
  
  ja: {
    // ナビゲーション
    'nav.title': 'Unicode記号コレクション',
    'nav.language': '言語',
    'nav.backToTop': 'トップに戻る',
    'nav.quickNav': 'クイックナビゲーション',
    
    // テーマ
    'theme.dark': 'ダークモードに切り替え',
    'theme.light': 'ライトモードに切り替え',
    
    // セクションタイトル
    'sections.symbols.title': '記号コレクション',
    'sections.symbols.description': 'すべてのUnicode記号を閲覧・検索し、複数のコピー形式とバッチ操作をサポート',
    'sections.symbols.count': '{count}個の記号',
    'sections.symbols.count_unit': '記号',
    'sections.favorites.title': 'お気に入り記号',
    'sections.favorites.description': 'お気に入りの記号を管理、データはブラウザのローカルストレージに保存',
    'sections.favorites.count_unit': 'お気に入り',
    'common.items': '項目',
    'sections.guide.title': '使用方法',
    'sections.guide.description': 'Unicode記号コレクションのすべての機能の使用方法を詳しく学ぶ',
    'sections.faq.title': 'よくある質問',
    'sections.faq.description': 'よくある質問への回答で、問題を素早く解決できます',
    
    // 検索
    'search.placeholder': '記号、名前、またはUnicodeを検索...',
    'search.tips.click': 'ヒント：記号をクリックで素早くコピー',
    'search.tips.dropdown': 'コピー ▼ をクリックでコピー形式を選択',
    'search.tips.multiSelect': 'Ctrlを押しながらクリックで複数選択',
    'search.tips.favorite': '★ をクリックで記号をお気に入りに',
    'search.tips.formats': 'サポート形式：Unicode、HTML、CSS、JavaScript、Python、Java、LaTeX、Markdown など',
    'search.resultCount': '{count}個の記号',
    'search.noResults': '一致する記号が見つかりません',
    'search.tips.adjust': '検索条件を調整するか、別のカテゴリを選択してください',
    
    // コピー機能
    'copy.symbol': '記号をコピー',
    'copy.unicode': 'Unicode',
    'copy.html': 'HTMLエンティティ',
    'copy.css': 'CSSコンテンツ',
    'copy.javascript': 'JavaScript',
    'copy.python': 'Python',
    'copy.java': 'Java/C#',
    'copy.latex': 'LaTeX',
    'copy.markdown': 'Markdown',
    'copy.xml': 'XML/SVG',
    'copy.json': 'JSON',
    'copy.document': 'ドキュメント形式',
    'copy.success': 'クリップボードにコピーしました',
    'copy.failed': 'コピーに失敗しました',
    'copy.batch': 'バッチコピー',
    'copy.clear': '選択をクリア',
    'copy.selected': '{count}個の記号を選択中',
    'copy.format.title': 'コピーフォーマット選択',
    'copy.format.common': '一般的なフォーマット',
    'copy.format.programming': 'プログラミング言語',
    'copy.format.web': 'Web開発',
    'copy.format.document': 'ドキュメントフォーマット',
    
    // お気に入り
    'favorites.add': 'お気に入りに追加',
    'favorites.remove': 'お気に入りから削除',
    'favorites.empty': 'お気に入り記号がありません',
    'favorites.emptyDesc': '記号カードの ★ ボタンをクリックしてお気に入りを追加',
    'favorites.clear': 'お気に入りをクリア',
    'favorites.clearConfirm': 'すべてのお気に入り記号をクリアしますか？',
    
    // ヒント
    'tips.usage.title': '💡 使用のヒント',
    'tips.usage.items': [
      '記号をクリックしてクリップボードに素早くコピー',
      '記号カードの右上の × をクリックして削除',
      'お気に入り記号はローカルに保存され、ブラウザデータを削除すると失われます'
    ],
    
    // カテゴリ
    'categories.all': 'すべて',
    'categories.mathematical': '数学記号',
    'categories.currency': '通貨記号',
    'categories.arrows': '矢印記号',
    'categories.punctuation': '句読点',
    'categories.shapes': '幾何学図形',
    'categories.miscellaneous': 'その他の記号',
    'categories.emoticons': '絵文字',
    'categories.technical': '技術記号',
    'categories.weather': '天気記号',
    'categories.office': 'オフィス記号',
    'categories.combination': 'チェックボックスとボックス',
    'categories.regional': '地域別記号',
    'categories.legal': '法律・ビジネス記号',
    'categories.religious': '宗教・文化記号',
    'categories.zodiac': '星座・占星術記号',
    'categories.gaming': 'ゲーム・エンターテイメント',
    'categories.transport': '交通・建築記号',
    'categories.nature': '自然・環境記号',
    'categories.food': '食べ物・ライフスタイル',
    'categories.sports': 'スポーツ・健康記号',
    'categories.music': '音楽・芸術記号',
    'categories.science': '科学・工学記号',
    
    // フッター
    'footer.features.title': '🎯 機能',
    'footer.features.items': [
      '665+ Unicode記号',
      '22カテゴリ',
      '12コピー形式'
    ],
    'footer.tech.title': '🚀 技術スタック',
    'footer.tech.items': [
      'Next.js 15 + React 19',
      'TypeScript + Tailwind CSS',
      'shadcn/ui コンポーネント'
    ],
    'footer.support.title': '💫 対応プラットフォーム',
    'footer.support.items': [
      'デスクトップ、モバイル、タブレット',
      'モダンブラウザ',
      'ダーク/ライトテーマ'
    ],
    'footer.description': '🎆 Unicode記号を素早くコピー | {count}+個の一般的な記号をサポート',
    'footer.made': 'Next.js & shadcn/ui で ❤️ を込めて作成',
    
    // 使用ガイド
    'guide.quickStart.title': 'クイックスタート',
    'guide.quickStart.search.title': '🔍 記号検索',
    'guide.quickStart.search.items': [
      '検索ボックスに記号名またはUnicodeコードを入力',
      '中国語、英語、記号自体の検索をサポート',
      '例：「ハート」、「heart」、「❤️」を検索'
    ],
    'guide.quickStart.category.title': '📂 カテゴリーブラウズ',
    'guide.quickStart.category.items': [
      'カテゴリータグをクリックして記号を素早くフィルター',
      '22のメインカテゴリーを含む',
      '各カテゴリーは記号数を表示'
    ],
    'guide.copy.title': 'コピー機能詳細',
    'guide.copy.quick.title': 'クイックコピー',
    'guide.copy.quick.desc': '記号を直接クリックしてクリップボードにコピー、簡単で高速',
    'guide.copy.quick.code': 'クリック → コピー → 貼り付けて使用',
    'guide.copy.format.title': 'フォーマットコピー',
    'guide.copy.format.desc': '「コピー ▼」ボタンをクリックして12種類の異なるフォーマットを選択',
    'guide.copy.batch.title': 'バッチコピー',
    'guide.copy.batch.desc': 'Ctrlキーを押しながら複数の記号をクリックしてバッチコピー',
    'guide.copy.batch.code': 'Ctrl + クリック = 複数選択',
    'guide.copy.formats.title': '💡 サポートされるコピーフォーマット',
    'guide.copy.formats.items': [
      '生記号', 'Unicodeコード', 'HTMLエンティティ', 'CSSコンテンツ',
      'JavaScript', 'Python', 'Java/C#', 'LaTeXコマンド',
      'Markdown', 'XML/SVG', 'JSONフォーマット', 'ドキュメントフォーマット'
    ],
    'guide.favorites.title': 'お気に入り記号管理',
    'guide.favorites.add.title': 'お気に入り記号を追加',
    'guide.favorites.add.desc': '任意の記号カードの ⭐ ボタンをクリックしてお気に入りに追加',
    'guide.favorites.add.action': '星をクリックして追加',
    'guide.favorites.manage.title': 'お気に入り記号を管理',
    'guide.favorites.manage.desc': 'お気に入りセクションで保存された記号に素早くアクセス、コピー、削除',
    'guide.favorites.manage.action': 'ローカルストレージ',
    'guide.favorites.warning': '📌 お気に入り記号はブラウザのローカルストレージに保存され、ブラウザデータを消去すると失われます',
    'guide.shortcuts.title': 'キーボードショートカット',
    'guide.shortcuts.basic.title': '基本操作',
    'guide.shortcuts.basic.search': '記号を検索',
    'guide.shortcuts.basic.multiSelect': '複数の記号を選択',
    'guide.shortcuts.basic.clear': '検索をクリア',
    'guide.shortcuts.advanced.title': '高度な機能',
    'guide.shortcuts.advanced.theme': 'テーマを切り替え',
    'guide.shortcuts.advanced.top': 'トップに戻る',
    'guide.shortcuts.advanced.nav': 'クイックナビゲーション',
    
    // FAQ
    'faq.title': 'よくある質問',
    'faq.subtitle': 'ユーザーが最もよく遇遇する問題と解決策です。あなたの問題がリストにない場合は、お気軽にフィードバックしてください。',
    'faq.all': 'すべての質問',
    'faq.categories.basic': '基本的な質問',
    'faq.categories.technical': '技術的な質問',
    'faq.categories.troubleshooting': 'トラブルシューティング',
    'faq.categories.advanced': '高度な機能',
    
    // FAQ項目
    'faq.items.device_display.question': 'なぜモバイルで不完全または文字化け表示されるのですか？',
    'faq.items.device_display.answer': 'これは正常な現象で、デバイスやフォントによるUnicode記号のサポート度が異なるためです。パソコンでの使用を推奨するか、モバイルのシステムとフォントを最新バージョンに更新してください。',
    'faq.items.copy_paste.question': 'コピー後に貼り付けが効かないのはなぜですか？',
    'faq.items.copy_paste.answer': '貼り付け先がUnicode文字をサポートしていることを確認してください。最新のテキストエディタやオフィスソフトなどが該当します。古いシステムやソフトウェアでは一部の特殊記号がサポートされない場合があります。',
    'faq.items.web_usage.question': 'ウェブページでこれらの記号を直接使用できますか？',
    'faq.items.web_usage.answer': 'はい、すべての記号は標準Unicode文字なので、HTML、CSS、JavaScriptで直接使用できます。特殊記号については、互換性を確保するためにHTMLエンティティエンコードを使用することを推奨します。',
    'faq.items.latex.question': 'LaTeX形式のエクスポートはサポートされていますか？',
    'faq.items.latex.answer': 'サポートされています。記号カードの「コピー▼」ボタンをクリックし、「LaTeX」形式を選択すると、\\heartsuit、\\spadesuitなどのLaTeXコマンドを取得できます。',
    'faq.items.favorites_storage.question': 'お気に入りの記号はどこに保存されますか？',
    'faq.items.favorites_storage.answer': 'お気に入りデータはブラウザのローカルストレージに保存され、サーバーにはアップロードされません。デバイス変更やブラウザデータの削除によりお気に入りが失われる可能性があるため、重要な記号は定期的にバックアップしてください。',
    'faq.items.search_symbols.question': '必要な記号を素早く見つけるにはどうすればよいですか？',
    'faq.items.search_symbols.answer': '検索機能を使用して記号名、Unicodeコードを入力するか、記号を直接貼り付けて検索できます。また、カテゴリーフィルターを使用して特定の記号カテゴリを素早く絞り込むこともできます。',
    'faq.items.batch_copy.question': '複数の記号を一括コピーするにはどうすればよいですか？',
    'faq.items.batch_copy.answer': 'Ctrlキー（MacではCmdキー）を押しながら複数の記号カードをクリックして選択します。画面下部に一括操作バーが表示され、「一括コピー」ボタンをクリックすると選択したすべての記号を一度にコピーできます。',
    'faq.items.search_accuracy.question': '検索結果が正確でない場合はどうすればよいですか？',
    'faq.items.search_accuracy.answer': 'より正確なキーワードを使用するか、Unicodeコードで検索してみてください。それでも見つからない場合は、その記号がまだ収録されていない可能性があります。フィードバックチャネルを通じてご連絡ください。',
    'faq.items.chat_software.question': 'チャットソフトで正常に表示されないのはなぜですか？',
    'faq.items.chat_software.answer': '一部のチャットソフトでは特殊記号のサポートが限定されています。まずはテキストエディタにコピーして記号が正常であることを確認してから送信することを推奨します。プラットフォームによって互換性が異なる場合があります。',
    'faq.items.programming.question': 'プログラミングでこれらの記号を使用するにはどうすればよいですか？',
    'faq.items.programming.answer': '複数のプログラミング言語形式を提供：JavaScript(\\uXXXX)、Python(\\uXXXX)、Java(\\uXXXX)、C#(\\uXXXX)など。対応する形式を選択してコピーし、コードで直接使用してください。',
    
    // 連絡先
    'faq.contact.title': 'お問い合わせ',
    'faq.contact.desc': 'ご質問、ご提案、記号の誤りなどがありましたら、以下の方法でお気軽にお問い合わせください：',
    'faq.contact.email': 'メール：support@unicode-symbols.com',
    'faq.contact.github': 'GitHub：github.com/unicode-symbols',
    'faq.contact.feedback': 'フィードバック'
  }
};

// 语言上下文类型
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  tArray: (key: string) => string[];
}

// 创建上下文
const LanguageContext = createContext<LanguageContextType | null>(null);

// 翻译函数
function translate(language: Language, key: string, params?: Record<string, string | number>): string {
  const translations = TRANSLATIONS[language] || TRANSLATIONS.zh;
  let text = translations[key as keyof typeof translations] || key;
  
  // 如果是字符串数组，返回第一个元素或默认值
  if (Array.isArray(text)) {
    return text[0] || key;
  }
  
  // 如果是字符串且有参数，进行替换
  if (typeof text === 'string' && params) {
    Object.keys(params).forEach(param => {
      text = (text as string).replace(new RegExp(`\\{${param}\\}`, 'g'), String(params[param]));
    });
  }
  
  return text as string;
}

// 获取数组的翻译函数
function translateArray(language: Language, key: string): string[] {
  const translations = TRANSLATIONS[language] || TRANSLATIONS.zh;
  const text = translations[key as keyof typeof translations];
  
  if (Array.isArray(text)) {
    return text;
  }
  
  return [];
}

// 语言Provider组件
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');

  // 从localStorage加载语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // 保存语言设置到localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    // 更新HTML的lang属性
    document.documentElement.lang = lang;
  };

  // 翻译函数
  const t = (key: string, params?: Record<string, string | number>) => {
    return translate(language, key, params);
  };
  
  // 数组翻译函数
  const tArray = (key: string) => {
    return translateArray(language, key);
  };

  const value: LanguageContextType = {
    language,
    setLanguage: handleSetLanguage,
    t,
    tArray
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// 使用语言的Hook
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}