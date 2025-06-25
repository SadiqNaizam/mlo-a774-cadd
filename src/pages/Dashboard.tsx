import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Users, BarChartBig, ArrowRight } from 'lucide-react';

// Custom Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import MetricCard from '@/components/MetricCard';
import AnalyticsChart from '@/components/AnalyticsChart';

// shadcn/ui Components
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Placeholder data for charts
const monthlyRevenueData = [
  { month: 'Jan', value: 4000 },
  { month: 'Feb', value: 3000 },
  { month: 'Mar', value: 5000 },
  { month: 'Apr', value: 4500 },
  { month: 'May', value: 6000 },
  { month: 'Jun', value: 5500 },
];

const categoryBreakdownData = [
  { category: 'Sales', value: 275 },
  { category: 'Expenses', value: 150 },
  { category: 'Clicks', value: 300 },
  { category: 'Impressions', value: 500 },
];

const Dashboard = () => {
  console.log('Dashboard loaded');

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          </div>
          
          {/* Metric Cards Section */}
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <MetricCard
              title="Total Revenue"
              value="$45,231.89"
              icon={<DollarSign className="h-4 w-4" />}
              trend="up"
              trendDescription="+20.1% from last month"
            />
            <MetricCard
              title="Active Users"
              value="+2,350"
              icon={<Users className="h-4 w-4" />}
              trend="up"
              trendDescription="+180.1% from last month"
            />
            <MetricCard
              title="Total Expenses"
              value="$12,134.50"
              icon={<BarChartBig className="h-4 w-4" />}
              trend="down"
              trendDescription="-15.3% from last month"
            />
          </section>

          {/* Charts and Quick Actions Section */}
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-8">
            <div className="col-span-12 lg:col-span-4">
              <AnalyticsChart
                chartType="line"
                data={monthlyRevenueData}
                categoryKey="month"
                dataKey="value"
                title="Monthly Revenue Trend"
                description="Showing revenue over the last 6 months."
              />
            </div>
             <div className="col-span-12 lg:col-span-3">
               <AnalyticsChart
                chartType="pie"
                data={categoryBreakdownData}
                categoryKey="category"
                dataKey="value"
                title="Data Point Breakdown"
                description="A summary of all data points by category."
              />
            </div>
          </section>
          
          {/* Quick Actions Card */}
          <section>
              <Card>
                  <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>
                          Get started by adding new data or viewing detailed analytics.
                      </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row gap-4">
                      <Button asChild>
                          <Link to="/data-management">
                              Add New Data
                              <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                      </Button>
                      <Button variant="outline" asChild>
                          <Link to="/analytics">
                              View Full Analytics
                              <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                      </Button>
                  </CardContent>
              </Card>
          </section>

        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;