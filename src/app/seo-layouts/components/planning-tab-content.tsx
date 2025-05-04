import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getPlanningData } from '@/actions/planning';
import TableHeaderCell from './table-header-cell';

export default async function PlanningTabContent() {
  const planningData = await getPlanningData();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-dark">Monthly SEO Planning</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell label="Month" />
              <TableHeaderCell label="Focus Keywords" />
              <TableHeaderCell label="Content Pieces" />
              <TableHeaderCell label="Backlinks Planned" />
              <TableHeaderCell label="Technical Fixes" />
              <TableHeaderCell label="Expected Traffic Increase" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {planningData.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">{plan.month}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {plan.focusKeywords.map((keyword, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{plan.contentPieces}</TableCell>
                <TableCell>{plan.backlinksPlanned}</TableCell>
                <TableCell>{plan.technicalFixes}</TableCell>
                <TableCell className="text-green-600 font-medium">
                  {plan.expectedTrafficIncrease}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
