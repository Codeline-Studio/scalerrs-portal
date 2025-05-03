import { getApprovalItems } from '@/actions/approvals';
import BaseTabContent from './base-tab-content';

export default async function BacklinksTabContent() {
  const approvalItems = await getApprovalItems();

  return (
    <BaseTabContent
      items={approvalItems.backlinks}
      categoryKey="backlinks"
    />
  );
}
