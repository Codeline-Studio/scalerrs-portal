interface StatusBadgeProps {
  status: string;
  type?: 'default' | 'keyword' | 'url' | 'priority';
}

export default function StatusBadge({ status, type = 'default' }: StatusBadgeProps) {
  let bgColor;
  let textColor;

  switch (type) {
    case 'url':
      bgColor = status === 'Optimizing'
        ? 'bg-blue-100'
        : status === 'Monitoring'
          ? 'bg-green-100'
          : 'bg-amber-100';
      textColor = status === 'Optimizing'
        ? 'text-blue-800'
        : status === 'Monitoring'
          ? 'text-green-800'
          : 'text-amber-800';
      break;
    case 'keyword':
      bgColor = status === 'Improving'
        ? 'bg-green-100'
        : status === 'Stable'
          ? 'bg-blue-100'
          : 'bg-purple-100';
      textColor = status === 'Improving'
        ? 'text-green-800'
        : status === 'Stable'
          ? 'text-blue-800'
          : 'text-purple-800';
      break;
    case 'priority':
      bgColor = status === 'Critical'
        ? 'bg-red-100'
        : status === 'High'
          ? 'bg-amber-100'
          : 'bg-blue-100';
      textColor = status === 'Critical'
        ? 'text-red-800'
        : status === 'High'
          ? 'text-amber-800'
          : 'text-blue-800';
      break;
    default:
      bgColor = status === 'Live'
        ? 'bg-green-100'
        : 'bg-amber-100';
      textColor = status === 'Live'
        ? 'text-green-800'
        : 'text-amber-800';
  }

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
}
