import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.post('/configurar-envio', (req, res) => {
    const dados = req.body;
    const { nomeGrupo, turma, aula, horario } = dados;

    if (!nomeGrupo || !turma || !aula || !horario) {
    return res.status(400).json({ status: 'Erro: Dados incompletos.' });
    }

    try {
    const filePath = path.join(__dirname, 'data', 'config.json'); // pasta data no mesmo nível do servidor.js
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
app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}`);
});
