import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  trendDescription?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendDescription,
}) => {
  console.log(`MetricCard loaded for: ${title}`);

  const TrendInfo = () => {
    if (!trend) return null;

    const trendClasses = cn(
      'flex items-center text-xs',
      trend === 'up' ? 'text-green-600' : 'text-red-600'
    );

    const TrendIcon = trend === 'up' ? ArrowUp : ArrowDown;

    return (
      <div className={trendClasses}>
        <TrendIcon className="h-4 w-4" />
        {trendDescription && <span className="ml-1 text-muted-foreground">{trendDescription}</span>}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <TrendInfo />
      </CardContent>
    </Card>
  );
};

export default MetricCard;