import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import Onboarding from './pages/Onboarding';
import HomeDashboard from './pages/HomeDashboard';
import DailyCare from './pages/DailyCare';
import DietHydration from './pages/DietHydration';
import ConsistencyProgress from './pages/ConsistencyProgress';
import MyProducts from './pages/MyProducts';
import ProfileSettings from './pages/ProfileSettings';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/dashboard" element={<HomeDashboard />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/routine" element={<DailyCare />} />
            <Route path="/daily-care" element={<DailyCare />} />
            <Route path="/hydration" element={<DietHydration />} />
            <Route path="/diet-hydration" element={<DietHydration />} />
            <Route path="/progress" element={<ConsistencyProgress />} />
            <Route path="/consistency" element={<ConsistencyProgress />} />
            <Route path="/products" element={<MyProducts />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}
