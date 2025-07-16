import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Routes from "./Routes";
import LoadingOverlay from './components/ui/LoadingOverlay';
import ToastContainer from './components/ui/ToastContainer';
import { checkAuthStatus } from './store/slices/authSlice';
import { loadPreferences } from './store/slices/uiSlice';

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.ui);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    // Initialize app
    const initializeApp = async () => {
      try {
        // Load user preferences
        dispatch(loadPreferences());
        
        // Check authentication status
        await dispatch(checkAuthStatus());
      } catch (error) {
        console.error('App initialization error:', error);
      }
    };

    initializeApp();
  }, [dispatch]);

  useEffect(() => {
    // Session timeout handling
    let sessionTimer;
    
    if (isAuthenticated) {
      // Check session every 5 minutes
      sessionTimer = setInterval(() => {
        dispatch(checkAuthStatus());
      }, 5 * 60 * 1000);
    }

    return () => {
      if (sessionTimer) {
        clearInterval(sessionTimer);
      }
    };
  }, [isAuthenticated, dispatch]);

  return (
    <div className="App">
      {loading.global && <LoadingOverlay />}
      <Routes />
      <ToastContainer />
    </div>
  );
}

export default App;
