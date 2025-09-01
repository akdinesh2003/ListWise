import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const shoppingListItems = [
  { name: 'Basmati Rice (1kg)', quantity: 1, checked: true },
  { name: 'Whole Milk (1L)', quantity: 2, checked: false },
  { name: 'Onions (1kg)', quantity: 1, checked: true },
  { name: 'Tomatoes (500g)', quantity: 1, checked: false },
  { name: 'Chicken Breast (500g)', quantity: 1, checked: false },
  { name: 'Lentils (Toor Dal, 1kg)', quantity: 1, checked: true },
  { name: 'Garam Masala (100g)', quantity: 1, checked: false },
];

export default function ShoppingListPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Shopping List</CardTitle>
        <CardDescription>
          Here are the items you need to buy on your next grocery trip.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shoppingListItems.map((item) => (
              <TableRow key={item.name}>
                <TableCell>
                  <Checkbox defaultChecked={item.checked} />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
