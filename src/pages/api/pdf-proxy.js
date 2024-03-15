// pages/api/pdf-proxy.js

import axios from 'axios';


export default async function handler(req, res) {
  try {
    const response = await axios.get('http://localhost:3000/MANUAL-HTML-Y-CSS.pdf', {
      responseType: 'arraybuffer',
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching PDF:', error);
    res.status(500).send('Internal Server Error');
  }
}
