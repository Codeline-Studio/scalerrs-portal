import { getApprovalItems } from '@/actions/approvals';
import BaseTabContent from './base-tab-content';

export default async function BriefsTabContent() {
  const approvalItems = await getApprovalItems();

  return (
    <BaseTabContent
      items={approvalItems.briefs}
      categoryKey="briefs"
    />
  );
}
