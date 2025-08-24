import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/charts/MetricCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Activity, 
  Clock, 
  Wifi 
} from 'lucide-react';
import { overviewMetrics, crashTrendData, performanceTrendData } from '@/services/mockData';

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor your mobile app's performance and stability</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Crash-Free Sessions"
          value={`${overviewMetrics.crashFreeSessionsPercentage}%`}
          trend="+0.3% from last week"
          icon={TrendingUp}
          variant="success"
          description="Percentage of sessions without crashes"
        />
        <MetricCard
          title="Total Crashes"
          value={overviewMetrics.totalCrashes}
          trend={overviewMetrics.crashTrend}
          icon={AlertTriangle}
          variant="danger"
          description="Last 7 days"
        />
        <MetricCard
          title="Avg Startup Time"
          value={`${overviewMetrics.avgStartupTime}s`}
          trend={overviewMetrics.performanceTrend}
          icon={Clock}
          variant="warning"
          description="Time to first screen"
        />
        <MetricCard
          title="API Failure Rate"
          value={`${overviewMetrics.apiFailureRate}%`}
          trend={overviewMetrics.networkTrend}
          icon={Wifi}
          variant="success"
          description="Network request failures"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Crash Trend Chart */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Crash Trends
            </CardTitle>
            <CardDescription>Daily crash occurrences over the last week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={crashTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="crashes" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--destructive))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Startup Time Trends
            </CardTitle>
            <CardDescription>Average app startup time over 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar 
                  dataKey="startupTime" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Statistics</CardTitle>
          <CardDescription>Key metrics at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <div className="text-2xl font-bold text-foreground">1.2M</div>
              <div className="text-sm text-muted-foreground">Total Sessions</div>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <div className="text-2xl font-bold text-foreground">15.6K</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <div className="text-2xl font-bold text-foreground">4.7</div>
              <div className="text-sm text-muted-foreground">App Store Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}