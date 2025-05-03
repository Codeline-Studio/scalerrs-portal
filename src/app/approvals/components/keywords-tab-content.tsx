import { getApprovalItems } from '@/actions/approvals';
import BaseTabContent from './base-tab-content';

export default async function KeywordsTabContent() {
  const approvalItems = await getApprovalItems();

  return (
    <BaseTabContent
      items={approvalItems.keywords}
      categoryKey="keywords"
    />
  );
}
