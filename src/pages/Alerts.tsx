import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, CheckCircle, Clock, Bell, TrendingUp } from 'lucide-react';
import { mockAlerts, Alert } from '@/services/mockData';
import { useToast } from '@/hooks/use-toast';
import { MetricCard } from '@/components/charts/MetricCard';

export function Alerts() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const { toast } = useToast();

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && !alert.resolved) ||
      (statusFilter === 'resolved' && alert.resolved);
    
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    
    return matchesStatus && matchesSeverity;
  });

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical': return 'status-danger';
      case 'warning': return 'status-warning';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical': return <AlertCircle className="h-4 w-4" />;
      case 'warning': return <AlertCircle className="h-4 w-4" />;
      case 'info': return <Bell className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const handleResolveAlert = (alertId: string) => {
    toast({
      title: "Alert resolved",
      description: "The alert has been marked as resolved.",
    });
  };

  const handleCreateRule = () => {
    toast({
      title: "Alert rule created",
      description: "New alert rule has been configured successfully.",
    });
  };

  // Calculate metrics
  const totalAlerts = mockAlerts.length;
  const activeAlerts = mockAlerts.filter(alert => !alert.resolved).length;
  const criticalAlerts = mockAlerts.filter(alert => alert.severity === 'critical').length;
  const resolvedToday = mockAlerts.filter(alert => 
    alert.resolved && 
    alert.timestamp.toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <AlertCircle className="h-8 w-8 text-warning" />
            Alerts & Notifications
          </h1>
          <p className="text-muted-foreground">Monitor and manage performance alerts</p>
        </div>
        <Button onClick={handleCreateRule}>
          <Bell className="h-4 w-4 mr-2" />
          Create Alert Rule
        </Button>
      </div>

      {/* Alert Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Alerts"
          value={totalAlerts.toString()}
          trend="+3 from yesterday"
          icon={Bell}
          variant="default"
          description="All time alerts"
        />
        <MetricCard
          title="Active Alerts"
          value={activeAlerts.toString()}
          trend="-1 from last hour"
          icon={AlertCircle}
          variant="warning"
          description="Unresolved alerts"
        />
        <MetricCard
          title="Critical Alerts"
          value={criticalAlerts.toString()}
          trend="No change"
          icon={TrendingUp}
          variant="danger"
          description="High priority"
        />
        <MetricCard
          title="Resolved Today"
          value={resolvedToday.toString()}
          trend="+2 from yesterday"
          icon={CheckCircle}
          variant="success"
          description="Alerts resolved"
        />
      </div>

      {/* Alert Rules Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Rules</CardTitle>
          <CardDescription>Configure thresholds and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground">Crash Rate Threshold</h3>
                <Badge variant="outline">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Alert when crash rate exceeds 1% in any 1-hour window
              </p>
              <div className="text-sm">
                <span className="text-muted-foreground">Current: </span>
                <span className="font-medium text-destructive">1.8%</span>
              </div>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground">API Latency Alert</h3>
                <Badge variant="outline">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Alert when average API latency exceeds 500ms
              </p>
              <div className="text-sm">
                <span className="text-muted-foreground">Current: </span>
                <span className="font-medium text-warning">720ms</span>
              </div>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground">Memory Usage Alert</h3>
                <Badge variant="secondary">Paused</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Alert when memory usage exceeds 85% on any device
              </p>
              <div className="text-sm">
                <span className="text-muted-foreground">Current: </span>
                <span className="font-medium text-success">67%</span>
              </div>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground">Error Rate Spike</h3>
                <Badge variant="outline">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Alert when error rate increases by 50% compared to baseline
              </p>
              <div className="text-sm">
                <span className="text-muted-foreground">Current: </span>
                <span className="font-medium text-success">0.3%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle>Alert History ({filteredAlerts.length})</CardTitle>
          <CardDescription>Recent alerts and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-4 border rounded-lg transition-colors ${
                  alert.resolved ? 'bg-muted/20 border-muted' : 'bg-card border-border'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)} bg-opacity-10`}>
                      {getSeverityIcon(alert.severity)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground">{alert.title}</h3>
                        <span className={`status-badge ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                        {alert.resolved && (
                          <Badge variant="secondary" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Resolved
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Metric: {alert.metric}</span>
                        <span>Threshold: {alert.threshold}</span>
                        <span>Current: {alert.currentValue}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {alert.timestamp.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!alert.resolved && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleResolveAlert(alert.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredAlerts.length === 0 && (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No alerts found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}