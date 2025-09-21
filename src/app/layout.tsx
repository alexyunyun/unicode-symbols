import type { Metadata } from "next";
import './globals.css';
import { ToastProvider } from '@/contexts/ToastContext';
import { ToastContainer } from '@/components/Toast';

export const metadata: Metadata = {
  title: "Unicode Symbols Collection | Unicode記号コレクション | Unicode符号大全",
  description: "A comprehensive collection of Unicode symbols with multiple copy formats. / 完全なUnicode記号のコレクション、複数のコピー形式をサポート。/ 全面的Unicode符号集合，支持多种复制格式。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className="antialiased">
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}