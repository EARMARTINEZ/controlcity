const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(express.json());

app.get('/proxy-pdf', async (req, res) => {
  try {
    const response = await axios.get('https://ceper.uniandes.edu.co/files/2022/10/MANUAL-HTML-Y-CSS.pdf', {
      responseType: 'arraybuffer',
    });

    res.header('Content-Type', 'application/pdf');
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
