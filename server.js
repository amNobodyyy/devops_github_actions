const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint for world time
app.get('/time/:city', (req, res) => {
  const city = req.params.city.toLowerCase();

  // Predefined city timezone offsets (in hours)
  const zones = {
    'newyork': -4,
    'paris': 1,
    'tokyo': 9,
    'sydney': 11,
    'mumbai': 5.5
  };

  if (!zones[city]) {
    return res.status(404).json({ error: 'City not supported' });
  }

  const utc = new Date();
  const localTime = new Date(utc.getTime() + zones[city] * 60 * 60 * 1000);

  res.json({
    city,
    time: localTime.toUTCString().replace('GMT', `UTC${zones[city] >= 0 ? '+' : ''}${zones[city]}`)
  });
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`🌍 Server running on http://localhost:${PORT}`));
