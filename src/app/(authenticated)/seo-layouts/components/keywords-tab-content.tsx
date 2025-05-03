import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getKeywordData } from '@/actions/keywords';
import TableHeaderCell from './table-header-cell';
import StatusBadge from './status-badge';

export default async function KeywordsTabContent() {
  const keywordData = await getKeywordData();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-dark">Keyword Performance</h2>
        <div className="flex items-center space-x-2">
          <select className="border border-lightGray rounded-md px-3 py-1 text-sm">
            <option>All Keywords</option>
            <option>High Volume</option>
            <option>Low Difficulty</option>
            <option>Improving</option>
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
              <TableHeaderCell label="Keyword" />
              <TableHeaderCell label="Volume" />
              <TableHeaderCell label="Difficulty" />
              <TableHeaderCell label="Current Rank" />
              <TableHeaderCell label="Target Rank" />
              <TableHeaderCell label="Target Page" />
              <TableHeaderCell label="Status" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {keywordData.map((keyword) => (
              <TableRow key={keyword.id}>
                <TableCell className="font-medium">{keyword.keyword}</TableCell>
                <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-2">{keyword.difficulty}</span>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          keyword.difficulty > 70 ? 'bg-red-500' :
                          keyword.difficulty > 50 ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${keyword.difficulty}%` }}
                      ></div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{keyword.currentRank}</TableCell>
                <TableCell>{keyword.targetRank}</TableCell>
                <TableCell>{keyword.targetPage}</TableCell>
                <TableCell>
                  <StatusBadge status={keyword.status} type="keyword" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
