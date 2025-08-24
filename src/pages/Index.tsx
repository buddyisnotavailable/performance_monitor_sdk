// Fallback page - this should redirect to login or dashboard based on auth state

import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated, otherwise this component won't be reached
  // because the main dashboard route will handle authenticated users
  return user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />;
};

export default Index;
