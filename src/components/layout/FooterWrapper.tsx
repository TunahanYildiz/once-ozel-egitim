'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function FooterWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.includes('/admin')) {
    return null;
  }
  return <>{children}</>;
}
