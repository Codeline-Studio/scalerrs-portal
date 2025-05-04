'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import TabNavigation from '@/components/ui/navigation/TabNavigation';

export type TabItem = {
  id: string;
  label: string;
};

type TabNavigationClientProps = {
  tabs: TabItem[];
  activeTab: string;
};

const TabNavigationClient = ({ tabs, activeTab }: TabNavigationClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabChange = (tabId: string) => {
    // Create a new URLSearchParams object
    const params = new URLSearchParams(searchParams?.toString());
    // Set the tab parameter
    params.set('tab', tabId);
    // Navigate to the new URL
    router.push(`?${params.toString()}`);
  };

  return (
    <TabNavigation
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      variant="primary"
      containerClassName="overflow-x-auto"
    />
  );
};

export default TabNavigationClient;
