// Mock data for the dashboard

export interface CrashReport {
  id: string;
  errorMessage: string;
  stackTrace: string;
  device: string;
  appVersion: string;
  timestamp: Date;
  platform: 'iOS' | 'Android';
  userId?: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

export interface PerformanceMetric {
  timestamp: Date;
  cpu: number;
  memory: number;
  fps: number;
  startupTime: number;
  appVersion: string;
}

export interface NetworkRequest {
  id: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  statusCode: number;
  latency: number;
  timestamp: Date;
  errorRate: number;
  size: number;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: Date;
  resolved: boolean;
  metric: string;
  threshold: number;
  currentValue: number;
}

// Dashboard Overview Metrics
export const overviewMetrics = {
  crashFreeSessionsPercentage: 99.2,
  totalCrashes: 23,
  avgStartupTime: 1.8,
  apiFailureRate: 0.5,
  crashTrend: '+12% from last week',
  performanceTrend: '-0.3s from last week',
  networkTrend: '-0.2% from last week'
};

// Mock Crash Reports
export const mockCrashReports: CrashReport[] = [
  {
    id: '1',
    errorMessage: 'NullPointerException: Cannot invoke method on null object',
    stackTrace: 'at com.app.MainActivity.onCreate(MainActivity.java:45)\nat android.app.Activity.performCreate(Activity.java:7136)',
    device: 'Samsung Galaxy S21',
    appVersion: '2.1.3',
    timestamp: new Date('2024-01-15T10:30:00'),
    platform: 'Android',
    userId: 'user_123',
    severity: 'critical'
  },
  {
    id: '2',
    errorMessage: 'Fatal Exception: NSInvalidArgumentException',
    stackTrace: '-[__NSArrayM objectAtIndex:]: index 10 beyond bounds [0 .. 5]',
    device: 'iPhone 13 Pro',
    appVersion: '2.1.2',
    timestamp: new Date('2024-01-15T09:15:00'),
    platform: 'iOS',
    userId: 'user_456',
    severity: 'high'
  },
  {
    id: '3',
    errorMessage: 'OutOfMemoryError: Java heap space exceeded',
    stackTrace: 'at com.app.ImageProcessor.loadLargeImage(ImageProcessor.java:112)',
    device: 'Google Pixel 6',
    appVersion: '2.1.3',
    timestamp: new Date('2024-01-14T16:22:00'),
    platform: 'Android',
    userId: 'user_789',
    severity: 'medium'
  }
];

// Mock Performance Data
export const mockPerformanceData: PerformanceMetric[] = Array.from({ length: 30 }, (_, i) => ({
  timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
  cpu: Math.random() * 80 + 20,
  memory: Math.random() * 70 + 30,
  fps: Math.random() * 20 + 40,
  startupTime: Math.random() * 2 + 1,
  appVersion: i > 20 ? '2.1.3' : '2.1.2'
}));

// Mock Network Requests
export const mockNetworkRequests: NetworkRequest[] = [
  {
    id: '1',
    url: '/api/v1/user/profile',
    method: 'GET',
    statusCode: 200,
    latency: 145,
    timestamp: new Date('2024-01-15T10:30:00'),
    errorRate: 0.1,
    size: 2048
  },
  {
    id: '2',
    url: '/api/v1/posts/feed',
    method: 'GET',
    statusCode: 500,
    latency: 2500,
    timestamp: new Date('2024-01-15T10:25:00'),
    errorRate: 5.2,
    size: 0
  },
  {
    id: '3',
    url: '/api/v1/auth/login',
    method: 'POST',
    statusCode: 200,
    latency: 89,
    timestamp: new Date('2024-01-15T10:20:00'),
    errorRate: 0.3,
    size: 512
  },
  {
    id: '4',
    url: '/api/v1/upload/image',
    method: 'POST',
    statusCode: 413,
    latency: 1200,
    timestamp: new Date('2024-01-15T10:15:00'),
    errorRate: 2.1,
    size: 0
  }
];

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'High Crash Rate Detected',
    description: 'Crash rate has exceeded 1% threshold in the last hour',
    severity: 'critical',
    timestamp: new Date('2024-01-15T10:30:00'),
    resolved: false,
    metric: 'Crash Rate',
    threshold: 1.0,
    currentValue: 1.8
  },
  {
    id: '2',
    title: 'API Latency Increase',
    description: 'Average API response time increased by 40% in last 30 minutes',
    severity: 'warning',
    timestamp: new Date('2024-01-15T10:00:00'),
    resolved: false,
    metric: 'API Latency',
    threshold: 500,
    currentValue: 720
  },
  {
    id: '3',
    title: 'Memory Usage Spike',
    description: 'Memory usage peaked at 95% on multiple devices',
    severity: 'warning',
    timestamp: new Date('2024-01-15T09:45:00'),
    resolved: true,
    metric: 'Memory Usage',
    threshold: 85,
    currentValue: 95
  }
];

// Chart data for dashboard
export const crashTrendData = Array.from({ length: 7 }, (_, i) => ({
  date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  crashes: Math.floor(Math.random() * 10) + 1,
  sessions: Math.floor(Math.random() * 1000) + 500
}));

export const performanceTrendData = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  startupTime: Math.random() * 1 + 1.5,
  apiLatency: Math.random() * 200 + 100
}));