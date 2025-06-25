import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

// Custom Layout Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import AnalyticsChart from '@/components/AnalyticsChart';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Placeholder data for charts
const monthlySalesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
];

const userGrowthData = [
  { month: 'Jan', users: 200 },
  { month: 'Feb', users: 240 },
  { month: 'Mar', users: 275 },
  { month: 'Apr', users: 340 },
  { month: 'May', users: 410 },
  { month: 'Jun', users: 450 },
];

const expenseBreakdownData = [
  { category: 'Marketing', value: 3500 },
  { category: 'Development', value: 5000 },
  { category: 'Support', value: 2000 },
  { category: 'Admin', value: 1500 },
];

const clickImpressionsData = [
    { day: 'Mon', clicks: 120, impressions: 1500 },
    { day: 'Tue', clicks: 180, impressions: 1700 },
    { day: 'Wed', clicks: 150, impressions: 1600 },
    { day: 'Thu', clicks: 210, impressions: 2000 },
    { day: 'Fri', clicks: 250, impressions: 2200 },
];


const AnalyticsPage = () => {
  console.log('AnalyticsPage loaded');
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 5, 30),
  });
  const [category, setCategory] = useState<string>('all');

  const handleApplyFilters = () => {
    // In a real app, this would trigger a data refetch with the filter parameters.
    console.log('Applying filters:', { category, date });
    // Example: queryClient.invalidateQueries(['analyticsData', category, date]);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
          {/* Filter Controls Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Analytics Filters</CardTitle>
              <CardDescription>
                Refine the charts below by selecting a category and date range.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col flex-wrap gap-4 md:flex-row md:items-center">
                <div className="grid gap-2">
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Expenses">Expenses</SelectItem>
                      <SelectItem value="Users">Users</SelectItem>
                      <SelectItem value="Clicks">Clicks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal md:w-[300px]",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button onClick={handleApplyFilters} className="w-full md:w-auto">Apply Filters</Button>
              </div>
            </CardContent>
          </Card>

          {/* Charts Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <AnalyticsChart
              chartType="bar"
              data={monthlySalesData}
              categoryKey="month"
              dataKey="sales"
              title="Monthly Sales"
              description="Overview of sales performance over the last 6 months."
            />
            <AnalyticsChart
              chartType="line"
              data={userGrowthData}
              categoryKey="month"
              dataKey="users"
              title="User Growth"
              description="Tracking new user acquisition over time."
            />
            <AnalyticsChart
              chartType="pie"
              data={expenseBreakdownData}
              categoryKey="category"
              dataKey="value"
              title="Expense Breakdown"
              description="A look at where resources are being allocated."
            />
            <AnalyticsChart
              chartType="bar"
              data={clickImpressionsData}
              categoryKey="day"
              dataKey="clicks"
              title="Clicks per Day"
              description="Daily clicks from marketing campaigns."
            />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AnalyticsPage;