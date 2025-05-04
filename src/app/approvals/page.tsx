import { Suspense } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PageContainer, { PageContainerBody, PageContainerTabs } from '@/components/ui/layout/PageContainer';
import { TabContentLoader } from '@/components/ui/loaders/TabContentLoader';
import TabNavigationClient from './components/tab-navigation-client';
import KeywordsTabContent from './components/keywords-tab-content';
import BriefsTabContent from './components/briefs-tab-content';
import ArticlesTabContent from './components/articles-tab-content';
import BacklinksTabContent from './components/backlinks-tab-content';
import QuickwinsTabContent from './components/quickwins-tab-content';
import GlobalSummaryBanner from './components/global-summary-banner';
import SidebarSummaryPanel from './components/sidebar-summary-panel';
import { getApprovalItems, getPendingCounts } from '@/actions/approvals';
import { TabItem } from './components/tab-navigation-client';

type ApprovalTabName = 'keywords' | 'briefs' | 'articles' | 'backlinks' | 'quickwins';

export default async function ApprovalsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Get the active tab from the URL parameters, defaulting to 'briefs'
  const resolvedSearchParams = await searchParams;
  const activeTab = ((resolvedSearchParams?.tab as string) || 'briefs') as ApprovalTabName;

  // Fetch approval items for summary counts
  const approvalItems = await getApprovalItems();

  // Calculate total approved and pending items
  const pendingCounts = getPendingCounts(approvalItems);
  const totalApproved = Object.values(approvalItems).flat().filter(item => item.status === 'approved').length;
  const totalPending = Object.values(pendingCounts).reduce((sum, count) => sum + count, 0);

  // Tab configuration
  const tabs: TabItem[] = [
    { id: 'keywords', label: 'Keyword Plans' },
    { id: 'briefs', label: 'Briefs' },
    { id: 'articles', label: 'Articles' },
    { id: 'backlinks', label: 'Link Lists' },
    { id: 'quickwins', label: 'Quick Wins' }
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark">Approvals</h1>
        <p className="text-mediumGray">Review and approve deliverables</p>
      </div>

      {/* Global Summary Banner */}
      <GlobalSummaryBanner counts={pendingCounts} />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-grow">
          {/* Tab Navigation */}
          <PageContainer>
            <PageContainerTabs>
              <TabNavigationClient
                tabs={tabs}
                activeTab={activeTab}
              />
            </PageContainerTabs>
            <PageContainerBody>
              <Suspense fallback={<TabContentLoader />}>
                {activeTab === 'keywords' && <KeywordsTabContent />}
                {activeTab === 'briefs' && <BriefsTabContent />}
                {activeTab === 'articles' && <ArticlesTabContent />}
                {activeTab === 'backlinks' && <BacklinksTabContent />}
                {activeTab === 'quickwins' && <QuickwinsTabContent />}
              </Suspense>
            </PageContainerBody>
          </PageContainer>
        </div>

        {/* Sidebar Summary Panel (Desktop Only) */}
        <div className="hidden lg:block w-64">
          <SidebarSummaryPanel
            counts={pendingCounts}
            totalApproved={totalApproved}
            totalPending={totalPending}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
