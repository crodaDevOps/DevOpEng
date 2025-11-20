import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, ErrorBoundary } from './components';
import { Dashboard } from './pages/dashboard';
import { PhaseView } from './pages/phase';
import { Login } from './pages/login';

const App = () => {
  // Theme State
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    if (isNight) {
      document.documentElement.setAttribute('data-theme', 'night');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isNight]);

  const toggleTheme = () => setIsNight(!isNight);

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes Wrapper */}
          <Route path="/" element={
            <Layout toggleTheme={toggleTheme} isNight={isNight}>
              <Dashboard />
            </Layout>
          } />
          
          <Route path="/phase/:id" element={
            <Layout toggleTheme={toggleTheme} isNight={isNight}>
              <PhaseView />
            </Layout>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;