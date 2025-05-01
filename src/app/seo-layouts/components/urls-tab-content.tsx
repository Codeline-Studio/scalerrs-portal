import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getUrlData } from '@/actions/url-performance';
import TableHeaderCell from './table-header-cell';
import StatusBadge from './status-badge';

export default async function UrlsTabContent() {
  const urlData = await getUrlData();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-dark">URL Performance</h2>
        <div className="flex items-center space-x-2">
          <select className="border border-lightGray rounded-md px-3 py-1 text-sm">
            <option>All URLs</option>
            <option>Blog Posts</option>
            <option>Service Pages</option>
            <option>Case Studies</option>
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
              <TableHeaderCell label="Title" />
              <TableHeaderCell label="Current Rank" />
              <TableHeaderCell label="Target Rank" />
              <TableHeaderCell label="Traffic" />
              <TableHeaderCell label="Conversion" />
              <TableHeaderCell label="Status" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {urlData.map((url) => (
              <TableRow key={url.id}>
                <TableCell className="font-medium">{url.url}</TableCell>
                <TableCell>{url.title}</TableCell>
                <TableCell>{url.currentRank}</TableCell>
                <TableCell>{url.targetRank}</TableCell>
                <TableCell>{url.traffic.toLocaleString()}</TableCell>
                <TableCell>{url.conversion}</TableCell>
                <TableCell>
                  <StatusBadge status={url.status} type="url" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
