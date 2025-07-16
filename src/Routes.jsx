import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { AuthProvider, PublicRoute, ProtectedRoute } from "components/ui/AuthenticationBoundary";
// Add your imports here
import PublicHomepage from "pages/public-homepage";
import AdminLogin from "pages/admin-login";
import EventRegistrationForm from "pages/event-registration-form";
import AdminDashboard from "pages/admin-dashboard";
import RegistrationManagement from "pages/registration-management";
import EventsManagement from "pages/events-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <ScrollToTop />
          <RouterRoutes>
            {/* Define your routes here */}
            <Route path="/" element={<PublicHomepage />} />
            <Route path="/public-homepage" element={<PublicHomepage />} />
            <Route path="/admin-login" element={
              <PublicRoute redirectTo="/admin-dashboard">
                <AdminLogin />
              </PublicRoute>
            } />
            <Route path="/event-registration-form" element={<EventRegistrationForm />} />
            <Route path="/admin-dashboard" element={
              <ProtectedRoute redirectTo="/admin-login">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/registration-management" element={
              <ProtectedRoute redirectTo="/admin-login">
                <RegistrationManagement />
              </ProtectedRoute>
            } />
            <Route path="/events-management" element={
              <ProtectedRoute redirectTo="/admin-login">
                <EventsManagement />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;