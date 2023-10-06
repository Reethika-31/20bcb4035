
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/api", (req, res) => {
  const trains = [
    { id: 1, name: 'Train A', departureTime: '10:00 AM', price: 50 },
    { id: 2, name: 'Train B', departureTime: '11:30 AM', price: 60 },
  ];

  res.json(trains);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
