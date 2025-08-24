import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Cpu, MemoryStick, Gauge, Clock } from 'lucide-react';
import { mockPerformanceData } from '@/services/mockData';
import { MetricCard } from '@/components/charts/MetricCard';
import { useState } from 'react';

export function Performance() {
  const [timeRange, setTimeRange] = useState('7d');
  const [metric, setMetric] = useState('all');

  // Calculate averages
  const avgCpu = mockPerformanceData.reduce((sum, data) => sum + data.cpu, 0) / mockPerformanceData.length;
  const avgMemory = mockPerformanceData.reduce((sum, data) => sum + data.memory, 0) / mockPerformanceData.length;
  const avgFps = mockPerformanceData.reduce((sum, data) => sum + data.fps, 0) / mockPerformanceData.length;
  const avgStartupTime = mockPerformanceData.reduce((sum, data) => sum + data.startupTime, 0) / mockPerformanceData.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" />
            Performance Monitoring
          </h1>
          <p className="text-muted-foreground">Track app performance metrics and trends</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Average CPU Usage"
          value={`${avgCpu.toFixed(1)}%`}
          trend="-2.3% from last week"
          icon={Cpu}
          variant="success"
          description="Across all devices"
        />
        <MetricCard
          title="Memory Usage"
          value={`${avgMemory.toFixed(1)}%`}
          trend="+1.2% from last week"
          icon={MemoryStick}
          variant="warning"
          description="Peak memory consumption"
        />
        <MetricCard
          title="Average FPS"
          value={avgFps.toFixed(0)}
          trend="+3 FPS from last week"
          icon={Gauge}
          variant="success"
          description="Frames per second"
        />
        <MetricCard
          title="Startup Time"
          value={`${avgStartupTime.toFixed(1)}s`}
          trend="-0.3s from last week"
          icon={Clock}
          variant="success"
          description="Time to first screen"
        />
      </div>

      {/* Performance Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* CPU & Memory Chart */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" />
              CPU & Memory Usage
            </CardTitle>
            <CardDescription>Resource utilization over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="timestamp" 
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Line 
                  type="monotone" 
                  dataKey="cpu" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="CPU %"
                />
                <Line 
                  type="monotone" 
                  dataKey="memory" 
                  stroke="hsl(var(--warning))" 
                  strokeWidth={2}
                  name="Memory %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* FPS Chart */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-success" />
              Frame Rate Performance
            </CardTitle>
            <CardDescription>Frames per second trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="timestamp" 
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Area 
                  type="monotone" 
                  dataKey="fps" 
                  stroke="hsl(var(--success))" 
                  fill="hsl(var(--success) / 0.1)"
                  strokeWidth={2}
                  name="FPS"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Startup Time by Version */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Startup Time Trends
          </CardTitle>
          <CardDescription>App launch performance across versions</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={mockPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="timestamp" 
                stroke="hsl(var(--muted-foreground))"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Line 
                type="monotone" 
                dataKey="startupTime" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Startup Time (s)"
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Key insights and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
              <h3 className="font-semibold text-success mb-2">✓ Good Performance</h3>
              <p className="text-sm text-muted-foreground">CPU and memory usage are within acceptable ranges across most devices.</p>
            </div>
            <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
              <h3 className="font-semibold text-warning mb-2">⚠ Areas for Improvement</h3>
              <p className="text-sm text-muted-foreground">Consider optimizing memory usage on older Android devices to improve stability.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}