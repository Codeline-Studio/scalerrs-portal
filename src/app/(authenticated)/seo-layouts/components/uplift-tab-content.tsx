import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getUpliftData } from '@/actions/uplift';
import TableHeaderCell from './table-header-cell';
import StatusBadge from './status-badge';

export default async function UpliftTabContent() {
  const upliftData = await getUpliftData();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-dark">Uplift Potential Analysis</h2>
        <div className="flex items-center space-x-2">
          <select className="border border-lightGray rounded-md px-3 py-1 text-sm">
            <option>All Pages</option>
            <option>High Priority</option>
            <option>Medium Priority</option>
            <option>Low Priority</option>
          </select>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell label="URL" />
              <TableHeaderCell label="Current Traffic" />
              <TableHeaderCell label="Potential Traffic" />
              <TableHeaderCell label="Uplift %" />
              <TableHeaderCell label="Primary Keyword" />
              <TableHeaderCell label="Secondary Keywords" />
              <TableHeaderCell label="Priority" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {upliftData.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.url}</TableCell>
                <TableCell>{page.currentTraffic.toLocaleString()}</TableCell>
                <TableCell>{page.potentialTraffic.toLocaleString()}</TableCell>
                <TableCell>
                  <span className={`font-medium ${
                    page.upliftPercentage > 200 ? 'text-green-600' :
                    page.upliftPercentage > 100 ? 'text-blue-600' : 'text-amber-600'
                  }`}>
                    +{page.upliftPercentage}%
                  </span>
                </TableCell>
                <TableCell>{page.primaryKeyword}</TableCell>
                <TableCell>{page.secondaryKeywords}</TableCell>
                <TableCell>
                  <StatusBadge status={page.priority} type="priority" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
