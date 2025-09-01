import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const pantryItems = [
  { name: 'Basmati Rice', quantity: '2 kg', stockLevel: 80 },
  { name: 'All-Purpose Flour', quantity: '1 kg', stockLevel: 50 },
  { name: 'Sugar', quantity: '500 g', stockLevel: 90 },
  { name: 'Olive Oil', quantity: '500 ml', stockLevel: 25 },
  { name: 'Turmeric Powder', quantity: '100 g', stockLevel: 60 },
  { name: 'Cumin Seeds', quantity: '100 g', stockLevel: 75 },
];

export default function PantryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Pantry</CardTitle>
        <CardDescription>
          Here's a look at what you currently have in stock.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="w-[150px]">Stock Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pantryItems.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <Progress value={item.stockLevel} className="h-2" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
