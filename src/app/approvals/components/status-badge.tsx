// Common status badge for approval items
export function StatusBadge({ status }: { status: string }) {
  let bgColor = '';
  let textColor = '';
  let displayText = '';

  switch (status) {
    case 'awaiting_approval':
      bgColor = 'bg-gold/10';
      textColor = 'text-gold';
      displayText = 'Awaiting Approval';
      break;
    case 'resubmitted':
      bgColor = 'bg-orange-100';
      textColor = 'text-orange-800';
      displayText = 'Resubmitted';
      break;
    case 'needs_revision':
      bgColor = 'bg-purple-100';
      textColor = 'text-purple-800';
      displayText = 'Needs Revision';
      break;
    case 'approved':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      displayText = 'Approved';
      break;
    case 'rejected':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      displayText = 'Rejected';
      break;
    default:
      bgColor = 'bg-lightGray';
      textColor = 'text-mediumGray';
      displayText = status.replace('_', ' ');
  }

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>
      {displayText}
    </span>
  );
}
