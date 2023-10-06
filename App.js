
import './App.css';

import React, { useState, useEffect } from 'react';

const App = () => {
  const [trains, setTrains] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrains = async () => {
    const response = await fetch('http://20.244.56.144/train/register', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    const trainData = await response.json();
    setTrains(trainData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTrains();
  }, []);

  const filterTrains = () => {
    const now = new Date();
    const trainsAfter30Mins = trains.filter(
      (train) => train.departureTime > now.getTime() + 30 * 60 * 1000
    );

    trainsAfter30Mins.sort((train1, train2) => {
      if (train1.price < train2.price) {
        return -1;
      } else if (train1.price > train2.price) {
        return 1;
      } else {
        if (train1.tickets < train2.tickets) {
          return 1;
        } else if (train1.tickets > train2.tickets) {
          return -1;
        } else {
          if (train1.departureTime - train1.delay < train2.departureTime - train2.delay) {
            return 1;
          } else if (train1.departureTime - train1.delay > train2.departureTime - train2.delay) {
            return -1;
          } else {
            return 0;
          }
        }
      }
    });

    return trainsAfter30Mins;
  };

  const renderTrains = () => {
    const trains = filterTrains();

    return (
      <div>
        {trains.map((train) => (
          <div key={train.id}>
            <h3>{train.name}</h3>
            <p>Departure time: {train.departureTime}</p>
            <p>Arrival time: {train.arrivalTime}</p>
            <p>Delay: {train.delay}</p>
            <p>Sleeper class tickets: {train.sleeperTicketsAvailable}</p>
            <p>Sleeper class price: {train.sleeperPrice}</p>
            <p>AC class tickets: {train.acTicketsAvailable}</p>
            <p>AC class price: {train.acPrice}</p>
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div>
        <h1>Loading trains...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Real-time train schedules</h1>
      {renderTrains()}
    </div>
  );
};
export default App;
