const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
const fs = require('fs');
const feedbacks = require('./data/feedbacks.json');

function convertToCron(horario) {
    const [hora, minuto] = horario.split(':');
    return `${minuto} ${hora} * * *`;
}

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Escaneie o QR Code acima com o WhatsApp.');
});

client.on('ready', () => {
    console.log('🤖 Bot pronto!');

    let segundosRestantes = 60;

    // Exibe o tempo restante a cada 10 segundos
    setInterval(() => {
        if (segundosRestantes > 0) {
            console.log(`⏳ Próximo envio em ${segundosRestantes} segundos...`);
            segundosRestantes -= 10;
        }
    }, 10000); // 10 segundos

    // Agendamento diário no horário definido no config.json
    cron.schedule(convertToCron(JSON.parse(fs.readFileSync('./config.json', 'utf-8')).horario), async () => {
        try {
            // Lê o config.json toda vez que o cron dispara
            const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
            const { turma, aula, nomeGrupo } = config;

            const mensagem = feedbacks[turma]?.[aula] || "Nenhum feedback encontrado para essa turma e aula.";

            const chats = await client.getChats();
            const grupo = chats.find(chat => chat.isGroup && chat.name === nomeGrupo);

            if (grupo) {
                await client.sendMessage(grupo.id._serialized, `📚 Feedback da turma *${turma}* - aula *${aula}*:\n\n${mensagem}`);
                console.log(`✅ Feedback da turma ${turma}, aula ${aula} enviado no grupo "${nomeGrupo}"`);
            } else {
                console.log(`❌ Grupo "${nomeGrupo}" não encontrado.`);
            }

            // Reinicia a contagem após envio
            segundosRestantes = 60;
        } catch (error) {
            console.error('Erro no agendamento:', error);
        }
    });
});

client.initialize();
