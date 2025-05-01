import { Suspense } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PageContainer, { PageContainerBody, PageContainerTabs } from '@/components/ui/layout/PageContainer';
import { TabContentLoader } from '@/components/ui/loaders/TabContentLoader';
import TabNavigationClient from './components/tab-navigation-client';
import UrlsTabContent from './components/urls-tab-content';
import KeywordsTabContent from './components/keywords-tab-content';
import UpliftTabContent from './components/uplift-tab-content';
import BacklinksTabContent from './components/backlinks-tab-content';
import PlanningTabContent from './components/planning-tab-content';
import { TabName, SearchParams, TabItem } from './components/types';

export default async function SEOLayoutsPage({
  searchParams,
}: {
  searchParams?: SearchParams | Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams || {};
  const activeTab = (resolvedSearchParams.tab || 'urls') as TabName;

  const tabs: TabItem[] = [
    { id: 'urls', label: 'URLs' },
    { id: 'keywords', label: 'Keywords' },
    { id: 'uplift', label: 'Uplift Potential' },
    { id: 'backlinks', label: 'Backlinks' },
    { id: 'planning', label: 'Monthly Planning' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark">SEO Layouts</h1>
        <p className="text-mediumGray">View your SEO campaign data in customizable table formats</p>
      </div>

      <PageContainer>
        <PageContainerTabs>
          <TabNavigationClient
            tabs={tabs}
            activeTab={activeTab}
          />
        </PageContainerTabs>
        <PageContainerBody>
          <Suspense fallback={<TabContentLoader />}>
            {activeTab === 'urls' && <UrlsTabContent />}
            {activeTab === 'keywords' && <KeywordsTabContent />}
            {activeTab === 'uplift' && <UpliftTabContent />}
            {activeTab === 'backlinks' && <BacklinksTabContent />}
            {activeTab === 'planning' && <PlanningTabContent />}
          </Suspense>
        </PageContainerBody>
      </PageContainer>
    </DashboardLayout>
  );
}
