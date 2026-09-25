import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDashboardAuth } from '../context/DashboardAuth';

export const ProtectedDashboardRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { loading, isAuthorized } = useDashboardAuth();

  if (loading) {
    return <div className="pt-32 text-center text-warm-gray/50">Verifying dashboard access...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/dashboard/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};
