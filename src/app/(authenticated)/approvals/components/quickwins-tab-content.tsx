import { getApprovalItems } from '@/actions/approvals';
import BaseTabContent from './base-tab-content';

export default async function QuickwinsTabContent() {
  const approvalItems = await getApprovalItems();

  return (
    <BaseTabContent
      items={approvalItems.quickwins}
      categoryKey="quickwins"
    />
  );
}
