import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Search, Filter, Download } from 'lucide-react';
import { mockCrashReports, CrashReport } from '@/services/mockData';
import { useToast } from '@/hooks/use-toast';

export function Crashes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const { toast } = useToast();

  const filteredCrashes = mockCrashReports.filter(crash => {
    const matchesSearch = crash.errorMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crash.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crash.appVersion.includes(searchTerm);
    
    const matchesPlatform = platformFilter === 'all' || crash.platform.toLowerCase() === platformFilter;
    const matchesSeverity = severityFilter === 'all' || crash.severity === severityFilter;
    
    return matchesSearch && matchesPlatform && matchesSeverity;
  });

  const getSeverityColor = (severity: CrashReport['severity']) => {
    switch (severity) {
      case 'critical': return 'status-danger';
      case 'high': return 'status-warning';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleExport = () => {
    toast({
      title: "Export initiated",
      description: "Crash reports are being exported to CSV format.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            Crash Reports
          </h1>
          <p className="text-muted-foreground">Monitor and analyze application crashes</p>
        </div>
        <Button onClick={handleExport} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Reports
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="metric-card-danger">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-foreground">{mockCrashReports.length}</div>
            <div className="text-sm text-muted-foreground">Total Crashes</div>
          </CardContent>
        </Card>
        <Card className="metric-card-warning">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-foreground">
              {mockCrashReports.filter(c => c.severity === 'critical').length}
            </div>
            <div className="text-sm text-muted-foreground">Critical Crashes</div>
          </CardContent>
        </Card>
        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-foreground">2.1.3</div>
            <div className="text-sm text-muted-foreground">Most Affected Version</div>
          </CardContent>
        </Card>
        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-foreground">Android</div>
            <div className="text-sm text-muted-foreground">Most Affected Platform</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search crashes by error message, device, or version..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="android">Android</SelectItem>
                <SelectItem value="ios">iOS</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Crash Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Crash Reports ({filteredCrashes.length})</CardTitle>
          <CardDescription>Recent crash occurrences with details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Error Message</th>
                  <th>Device</th>
                  <th>Platform</th>
                  <th>App Version</th>
                  <th>Severity</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredCrashes.map((crash) => (
                  <tr key={crash.id} className="hover:bg-muted/50">
                    <td className="max-w-xs">
                      <div className="font-medium text-foreground truncate">
                        {crash.errorMessage}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {crash.stackTrace.split('\n')[0]}
                      </div>
                    </td>
                    <td className="text-sm text-foreground">{crash.device}</td>
                    <td>
                      <Badge variant="outline">{crash.platform}</Badge>
                    </td>
                    <td className="text-sm text-foreground">{crash.appVersion}</td>
                    <td>
                      <span className={`status-badge ${getSeverityColor(crash.severity)}`}>
                        {crash.severity}
                      </span>
                    </td>
                    <td className="text-sm text-muted-foreground">
                      {crash.timestamp.toLocaleDateString()} {crash.timestamp.toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredCrashes.length === 0 && (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No crashes found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}