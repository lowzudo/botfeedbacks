const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/configurar-envio', (req, res) => {
    const dados = req.body;
    const { nomeGrupo, turma, aula, horario } = dados;

    if (!nomeGrupo || !turma || !aula || !horario)
        return res.status(400).json({ status: 'Erro: Dados incompletos.' });

    try {
        const filePath = path.join(__dirname, 'data', 'config.json');
        fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));
        res.json({ status: 'Configuração salva com sucesso!' });
    } catch (err) {
        console.error('Erro ao salvar arquivo:', err);
        res.status(500).json({ status: 'Erro interno ao salvar configuração.' });
    }
});

app.get('/', (req, res) => {
    res.send('Servidor está funcionando! 🚀');
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Servidor escutando na porta ${PORT}`));
