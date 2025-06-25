import * as React from "react";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface AnalyticsChartProps {
  chartType: "bar" | "line" | "pie";
  data: any[];
  categoryKey: string; // e.g., 'month' for x-axis or pie labels
  dataKey: string;     // e.g., 'value' for y-axis or pie values
  title: string;
  description?: string;
  className?: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  chartType,
  data,
  categoryKey,
  dataKey,
  title,
  description,
  className,
}) => {
  console.log(`AnalyticsChart loaded: ${title} (${chartType})`);

  // Dynamically create a basic chart config.
  // For more complex charts with multiple data keys, this would need expansion.
  const chartConfig = {
    [dataKey]: {
      label: dataKey.charAt(0).toUpperCase() + dataKey.slice(1), // Capitalize the dataKey for the label
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={categoryKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              stroke="#888888"
              fontSize={12}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey={dataKey}
              fill="var(--color-value)"
              radius={4}
            />
          </BarChart>
        );
      case "line":
        return (
          <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={categoryKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke="#888888"
              fontSize={12}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="var(--color-value)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        );
      case "pie":
        return (
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={categoryKey}
              innerRadius={60}
              strokeWidth={5}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey={categoryKey} />}
              verticalAlign="bottom"
              height={40}
            />
          </PieChart>
        );
      default:
        return <div>Invalid chart type specified.</div>;
    }
  };

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {/* The key is set to chartType to force a re-render when the type changes, avoiding recharts state issues */}
        <ChartContainer key={chartType} config={chartConfig} className="mx-auto aspect-square h-[250px] w-full">
           <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;