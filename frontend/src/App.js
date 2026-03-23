import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import UsersScreen from './screens/UsersScreen';
import UploadAudioScreen from './screens/UploadAudioScreen'


function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Public route - no sidebar */}
          <Route path="/login" element={<LoginScreen />} />

          {/* Protected routes - with sidebar */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardScreen />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Layout>
                  <UsersScreen />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/audio"
            element={
              <PrivateRoute>
                <Layout>
                 <UploadAudioScreen />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;