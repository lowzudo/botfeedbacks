const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json()); // se quiser receber POST depois

app.get('/feedbacks', (req, res) => {
    const feedbacks = JSON.parse(fs.readFileSync('./data/feedbacks.json', 'utf-8'));
    res.json(feedbacks);
});

app.listen(3001, () => console.log('API rodando em http://localhost:3001'));
