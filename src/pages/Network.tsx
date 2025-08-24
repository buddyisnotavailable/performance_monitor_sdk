import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Network as NetworkIcon, Search, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { mockNetworkRequests, NetworkRequest } from '@/services/mockData';
import { MetricCard } from '@/components/charts/MetricCard';

export function Network() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredRequests = mockNetworkRequests.filter(request => {
    const matchesSearch = request.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.method.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'success' && request.statusCode >= 200 && request.statusCode < 300) ||
      (statusFilter === 'error' && (request.statusCode >= 400 || request.statusCode >= 500));
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return 'status-success';
    if (statusCode >= 400 && statusCode < 500) return 'status-warning';
    if (statusCode >= 500) return 'status-danger';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusIcon = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return <CheckCircle className="h-4 w-4" />;
    if (statusCode >= 400) return <XCircle className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'POST': return 'bg-green-100 text-green-800 border-green-200';
      case 'PUT': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'DELETE': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Calculate metrics
  const avgLatency = mockNetworkRequests.reduce((sum, req) => sum + req.latency, 0) / mockNetworkRequests.length;
  const successRate = (mockNetworkRequests.filter(req => req.statusCode >= 200 && req.statusCode < 300).length / mockNetworkRequests.length) * 100;
  const errorRate = (mockNetworkRequests.filter(req => req.statusCode >= 400).length / mockNetworkRequests.length) * 100;
  const totalRequests = mockNetworkRequests.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <NetworkIcon className="h-8 w-8 text-primary" />
          Network Monitoring
        </h1>
        <p className="text-muted-foreground">Track API performance and network requests</p>
      </div>

      {/* Network Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Requests"
          value={totalRequests.toString()}
          trend="+15% from last hour"
          icon={NetworkIcon}
          variant="default"
          description="API calls in last hour"
        />
        <MetricCard
          title="Average Latency"
          value={`${avgLatency.toFixed(0)}ms`}
          trend="-12ms from last hour"
          icon={Clock}
          variant="success"
          description="Response time"
        />
        <MetricCard
          title="Success Rate"
          value={`${successRate.toFixed(1)}%`}
          trend="+2.1% from last hour"
          icon={CheckCircle}
          variant="success"
          description="2xx status codes"
        />
        <MetricCard
          title="Error Rate"
          value={`${errorRate.toFixed(1)}%`}
          trend="-0.8% from last hour"
          icon={XCircle}
          variant="warning"
          description="4xx/5xx status codes"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by URL or method..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success (2xx)</SelectItem>
                <SelectItem value="error">Error (4xx/5xx)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Network Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent API Requests ({filteredRequests.length})</CardTitle>
          <CardDescription>Real-time network activity monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Endpoint</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Latency</th>
                  <th>Size</th>
                  <th>Error Rate</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-muted/50">
                    <td className="max-w-xs">
                      <div className="font-medium text-foreground truncate">
                        {request.url}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${getMethodColor(request.method)}`}>
                        {request.method}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(request.statusCode)}
                        <span className={`status-badge ${getStatusColor(request.statusCode)}`}>
                          {request.statusCode}
                        </span>
                      </div>
                    </td>
                    <td className="text-sm">
                      <span className={request.latency > 1000 ? 'text-destructive font-medium' : 'text-foreground'}>
                        {request.latency}ms
                      </span>
                    </td>
                    <td className="text-sm text-muted-foreground">
                      {request.size > 0 ? `${(request.size / 1024).toFixed(1)}KB` : '-'}
                    </td>
                    <td className="text-sm">
                      <span className={request.errorRate > 2 ? 'text-destructive font-medium' : 'text-foreground'}>
                        {request.errorRate}%
                      </span>
                    </td>
                    <td className="text-sm text-muted-foreground">
                      {request.timestamp.toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredRequests.length === 0 && (
            <div className="text-center py-8">
              <NetworkIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No network requests found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* API Endpoints Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Top API Endpoints</CardTitle>
          <CardDescription>Most frequently called endpoints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { endpoint: '/api/v1/user/profile', calls: 1250, avgLatency: 145, errorRate: 0.1 },
              { endpoint: '/api/v1/posts/feed', calls: 890, avgLatency: 320, errorRate: 2.3 },
              { endpoint: '/api/v1/auth/login', calls: 456, avgLatency: 89, errorRate: 0.5 },
              { endpoint: '/api/v1/upload/image', calls: 234, avgLatency: 1200, errorRate: 4.2 },
            ].map((endpoint, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div>
                  <div className="font-medium text-foreground">{endpoint.endpoint}</div>
                  <div className="text-sm text-muted-foreground">{endpoint.calls} calls</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-foreground">{endpoint.avgLatency}ms avg</div>
                  <div className={`text-sm ${endpoint.errorRate > 2 ? 'text-destructive' : 'text-success'}`}>
                    {endpoint.errorRate}% error rate
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}