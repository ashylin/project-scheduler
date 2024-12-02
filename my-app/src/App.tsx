// src/App.tsx
import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import TimelineDashboard from './components/TimelineDashboard';
import MeetingScheduler from './components/MeetingScheduler';
import AIAssistant from './components/AIAssistant';
import './App.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [events, setEvents] = useState([]);

  const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
  const API_KEY = 'YOUR_GOOGLE_API_KEY';
  const SCOPES = 'https://www.googleapis.com/auth/calendar';

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES
      });
    };

    gapi.load('client:auth2', initClient);
  }, []);

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      setIsAuthenticated(true);
      loadEvents();
    });
  };

  const loadEvents = async () => {
    const response = await gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'orderBy': 'startTime'
    });
    setEvents(response.result.items);
  };

  return (
    <div className="app">
      {!isAuthenticated ? (
        <button onClick={handleAuthClick}>Sign in with Google</button>
      ) : (
        <div className="dashboard">
          <MeetingScheduler events={events} />
          <TimelineDashboard events={events} />
          <AIAssistant />
        </div>
      )}
    </div>
  );
};

export default App;