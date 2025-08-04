const express = require('express');
const cors = require('cors');
const feedbacks = require('./data/feedbacks.json'); // mantém o JSON aqui no bot

const app = express();
app.use(cors()); // permite que o front acesse

app.get('/feedbacks', (req, res) => {
  res.json(feedbacks); // envia os dados quando alguém acessar
});

app.listen(3001, () => console.log('API rodando em http://localhost:3001'));
