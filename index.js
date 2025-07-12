const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
const feedbacks = require('./data/feedbacks.json');

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

    // Agendamento da todo dia as 21
    cron.schedule('0 21 * * *', async () => {
        const turma = 'CTRL+KIDS1';
        const aula = 'FEEDBACK-FINAL-KD1';

        const mensagem = feedbacks[turma]?.[aula] || "Nenhum feedback encontrado para essa turma e aula.";

        const nomeGrupo = 'Lalau';
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
    });
});

client.initialize();
