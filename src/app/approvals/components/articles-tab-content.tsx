import { getApprovalItems } from '@/actions/approvals';
import BaseTabContent from './base-tab-content';

export default async function ArticlesTabContent() {
  const approvalItems = await getApprovalItems();

  return (
    <BaseTabContent
      items={approvalItems.articles}
      categoryKey="articles"
    />
  );
}
