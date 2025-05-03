import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getBacklinkData } from '@/actions/backlink';
import TableHeaderCell from './table-header-cell';
import StatusBadge from './status-badge';

export default async function BacklinksTabContent() {
  const backlinkData = await getBacklinkData();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-dark">Backlink Analysis</h2>
        <div className="flex items-center space-x-2">
          <select className="border border-lightGray rounded-md px-3 py-1 text-sm">
            <option>All Backlinks</option>
            <option>Live</option>
            <option>Pending</option>
            <option>High DR</option>
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
              <TableHeaderCell label="Target URL" />
              <TableHeaderCell label="Source Domain" />
              <TableHeaderCell label="Domain Rating" />
              <TableHeaderCell label="Link Type" />
              <TableHeaderCell label="Status" />
              <TableHeaderCell label="Date Acquired" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {backlinkData.map((link) => (
              <TableRow key={link.id}>
                <TableCell className="font-medium">{link.targetUrl}</TableCell>
                <TableCell>{link.sourceDomain}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-2">{link.domainRating}</span>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          link.domainRating > 80 ? 'bg-green-500' :
                          link.domainRating > 60 ? 'bg-blue-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${link.domainRating}%` }}
                      ></div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{link.linkType}</TableCell>
                <TableCell>
                  <StatusBadge status={link.status} type="default" />
                </TableCell>
                <TableCell>{link.dateAcquired}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
