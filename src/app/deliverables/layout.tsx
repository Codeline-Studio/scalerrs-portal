'use client';

import DashboardLayout from '@/components/DashboardLayout';

export default function DeliverableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
