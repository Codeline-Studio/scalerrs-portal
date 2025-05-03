import { TableHead } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";

interface TableHeaderCellProps {
  label: string;
}

export default function TableHeaderCell({ label }: TableHeaderCellProps) {
  return (
    <TableHead className="whitespace-nowrap">
      <div className="flex items-center">
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    </TableHead>
  );
}
