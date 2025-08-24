import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  description?: string;
}

export function MetricCard({ 
  title, 
  value, 
  trend, 
  icon: Icon, 
  variant = 'default',
  description 
}: MetricCardProps) {
  const cardClasses = cn(
    "transition-all duration-200 hover:shadow-md",
    {
      'metric-card': variant === 'default',
      'metric-card-success': variant === 'success',
      'metric-card-warning': variant === 'warning',
      'metric-card-danger': variant === 'danger',
    }
  );

  const getTrendColor = (trend?: string) => {
    if (!trend) return '';
    if (trend.includes('+') || trend.includes('increase')) return 'text-success';
    if (trend.includes('-') || trend.includes('decrease')) return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getIconColor = () => {
    switch (variant) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'danger': return 'text-destructive';
      default: return 'text-primary';
    }
  };

  return (
    <Card className={cardClasses}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn("h-4 w-4", getIconColor())} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {trend && (
          <p className={cn("text-xs mt-1", getTrendColor(trend))}>
            {trend}
          </p>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}