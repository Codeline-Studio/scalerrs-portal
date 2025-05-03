'use client';

import { useRouter } from 'next/navigation';
import TabNavigation from '@/components/ui/navigation/TabNavigation';
import { TabItem } from './types';

interface TabNavigationClientProps {
  tabs: TabItem[];
  activeTab: string;
}

export default function TabNavigationClient({
  tabs,
  activeTab
}: TabNavigationClientProps) {
  const router = useRouter();

  const handleTabChange = (tabId: string) => {
    router.push(`?tab=${tabId}`);
  };

  return (
    <TabNavigation
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      variant="primary"
    />
  );
}
