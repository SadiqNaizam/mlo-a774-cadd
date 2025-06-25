import React, { useState, useEffect } from 'react';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

// Custom Layout Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';

// Custom Functional Components
import DataEntryForm from '@/components/DataEntryForm';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Define the type for a single data entry
type DataEntry = {
  id: string;
  value: number;
  category: string;
  date: Date;
};

// Initial placeholder data to make the table feel alive
const initialData: DataEntry[] = [
  { id: '1', value: 150.75, category: 'Sales', date: new Date('2023-10-26') },
  { id: '2', value: 75.00, category: 'Expenses', date: new Date('2023-10-25') },
  { id: '3', value: 1200, category: 'Users', date: new Date('2023-10-24') },
  { id: '4', value: 5430, category: 'Clicks', date: new Date('2023-10-24') },
  { id: '5', value: 89.99, category: 'Sales', date: new Date('2023-10-23') },
];

const DataManagementPage = () => {
  useEffect(() => {
    console.log('DataManagementPage loaded');
  }, []);

  const [data, setData] = useState<DataEntry[]>(initialData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // In a real app, this would be used to pre-fill the form for editing
  // const [editingEntry, setEditingEntry] = useState<DataEntry | null>(null);

  // Handler for successful form submission
  const handleAddEntry = (newEntry: { value: number; category: string; date: Date }) => {
    setData(prevData => [
      { id: crypto.randomUUID(), ...newEntry },
      ...prevData,
    ]);
    setIsDialogOpen(false); // Close the dialog
    toast.success('Data entry created!', {
      description: `Added ${newEntry.value} to ${newEntry.category}`,
    });
  };

  // Handler for deleting an entry
  const handleDeleteEntry = (idToDelete: string) => {
    setData(prevData => prevData.filter(entry => entry.id !== idToDelete));
    toast.info('Data entry has been deleted.');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold tracking-tight">Data Management</h1>
            <div className="ml-auto flex items-center gap-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add New Entry
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Data Entry</DialogTitle>
                  </DialogHeader>
                  <DataEntryForm onSuccess={handleAddEntry} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Data Entries</CardTitle>
              <CardDescription>
                A comprehensive list of all your recorded data points.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Value</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.length > 0 ? (
                    data.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{entry.value.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{entry.category}</Badge>
                        </TableCell>
                        <TableCell>{entry.date.toLocaleDateString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  toast.info("Edit functionality is not yet implemented.")
                                }
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                onClick={() => handleDeleteEntry(entry.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No data entries found. Add one to get started!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DataManagementPage;