import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Pages
import { Login } from "@/pages/Login";
import { Dashboard } from "@/pages/Dashboard";
import { Crashes } from "@/pages/Crashes";
import { Performance } from "@/pages/Performance";
import { Network } from "@/pages/Network";
import { Alerts } from "@/pages/Alerts";
import { Settings } from "@/pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="dashboard-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected Routes with Dashboard Layout */}
              <Route path="/" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/crashes" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Crashes />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/performance" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Performance />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/network" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Network />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/alerts" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Alerts />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Settings />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
