/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { useState, useEffect } from 'react';
import { extractLocations, getEvents } from './api';
import { WarningAlert } from './components/Alert';

import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [warningAlert, setWarningAlert] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      setWarningAlert(
        'Watch out: You are offline. The list of events may be outdated.'
      );
    } else {
      setWarningAlert('');
    }
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === 'See all cities'
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);

    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  return (
    <div className="App">
      <h1 id="title">WebDev MeetUp Events</h1>
      <div className="alerts-container"></div>
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />

      <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} />
      {warningAlert && (
        <WarningAlert text={warningAlert} className="warning-alert" />
      )}
      <EventList events={events} />
    </div>
  );
}

export default App;
