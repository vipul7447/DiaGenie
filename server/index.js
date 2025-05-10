const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/predict', (req, res) => {
  const text = req.body.text;

  // Call Python script with input text
  exec(`python3 predict.py "${text}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: 'Prediction failed' });
    }

    try {
      const parsed = JSON.parse(stdout.trim());
      return res.json(parsed);
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr.message);
      return res.status(500).json({ error: 'Invalid response from model' });
    }
  });
});

app.listen(5000, () => {
  console.log('Server running on http://127.0.0.1:3003');
});
