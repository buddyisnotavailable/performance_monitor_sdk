import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Settings as SettingsIcon, User, Bell, Shield, Download, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [criticalAlertsOnly, setCriticalAlertsOnly] = useState(false);
  const [dataRetention, setDataRetention] = useState('90');
  const [autoReports, setAutoReports] = useState(true);

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export started",
      description: "Your data export will be ready for download shortly.",
    });
  };

  const handleDeleteData = () => {
    toast({
      title: "Deletion requested",
      description: "A confirmation email has been sent to delete your data.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <SettingsIcon className="h-8 w-8 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Settings */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Settings
              </CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user?.name || ''} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={user?.email || ''} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Your company name" />
              </div>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how you receive alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts via email
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Browser push notifications
                  </p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Critical Alerts Only</Label>
                  <p className="text-sm text-muted-foreground">
                    Only receive critical severity alerts
                  </p>
                </div>
                <Switch
                  checked={criticalAlertsOnly}
                  onCheckedChange={setCriticalAlertsOnly}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Alert Frequency</Label>
                <Select defaultValue="immediate">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="hourly">Hourly Digest</SelectItem>
                    <SelectItem value="daily">Daily Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Data & Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Data & Privacy
              </CardTitle>
              <CardDescription>
                Manage your data and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Data Retention Period</Label>
                <Select value={dataRetention} onValueChange={setDataRetention}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">6 months</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  How long to keep crash reports and performance data
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatic Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Generate weekly performance reports
                  </p>
                </div>
                <Switch
                  checked={autoReports}
                  onCheckedChange={setAutoReports}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Data Export & Deletion</h3>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteData}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete All Data
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Export your data or request permanent deletion
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" onClick={handleSaveSettings}>
                Save All Settings
              </Button>
              <Button variant="outline" className="w-full">
                Reset to Defaults
              </Button>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Plan: </span>
                <span className="font-medium">Pro</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Apps: </span>
                <span className="font-medium">3 / 10</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Storage: </span>
                <span className="font-medium">2.4 GB / 10 GB</span>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integration Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">iOS SDK</span>
                <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Android SDK</span>
                <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Slack</span>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">Inactive</span>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                Manage Integrations
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}