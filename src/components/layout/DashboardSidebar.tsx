import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  AlertTriangle,
  Activity,
  Network,
  AlertCircle,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Crash Reports", url: "/crashes", icon: AlertTriangle },
  { title: "Performance", url: "/performance", icon: Activity },
  { title: "Network", url: "/network", icon: Network },
  { title: "Alerts", url: "/alerts", icon: AlertCircle },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { logout, user } = useAuth();
  const currentPath = location.pathname;
  
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-primary-foreground font-medium border-r-2 border-primary" 
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-semibold text-sidebar-foreground">Monitor SDK</h2>
                <p className="text-xs text-sidebar-foreground/60">Performance Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavClass}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Section */}
        <div className="mt-auto p-4 border-t border-sidebar-border">
          {!isCollapsed && user && (
            <div className="mb-3">
              <p className="text-sm font-medium text-sidebar-foreground">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/60">{user.email}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50"
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}