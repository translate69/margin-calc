import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '火锅套餐毛利率计算器',
    template: '%s | 火锅套餐毛利率计算器',
  },
  description: '面向餐饮从业者的火锅套餐毛利率计算器，支持多套餐对比、成本结构可视化、数据库同步',
  keywords: [
    '火锅套餐毛利率计算器',
    '餐饮成本核算',
    '毛利率计算',
    '套餐定价',
  ],
  authors: [{ name: '火锅成本核算工具' }],
  // icons: {
  //   icon: '',
  // },
  openGraph: {
    title: '火锅套餐毛利率计算器',
    description: '面向餐饮从业者的火锅套餐毛利率计算器，支持多套餐对比、成本结构可视化、数据库同步',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
