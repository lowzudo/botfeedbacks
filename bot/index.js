const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
const fs = require('fs');
const moment = require('moment-timezone');

const feedbacks = require('./data/feedbacks.json');

const client = new Client({
    authStrategy: new LocalAuth()
});

let scheduledTask = null;
let countdownInterval = null;
let lastConfig = null;

// ==================== Funções ====================
function loadConfig() {
    return JSON.parse(fs.readFileSync('./data/config.json', 'utf-8'));
}

function convertToCron(horario) {
    const [hora, minuto] = horario.split(':');
    return `${minuto} ${hora} * * *`;
}

function getNextExecutionTime(horario) {
    const now = moment().tz('America/Sao_Paulo');
    const [hora, minuto] = horario.split(':').map(Number);
    let next = moment(now).tz('America/Sao_Paulo').hour(hora).minute(minuto).second(0).millisecond(0);
    if (next.isBefore(now)) next.add(1, 'day');
    return next;
}

function startCountdown(horario) {
    if (countdownInterval) clearInterval(countdownInterval);
    let nextExecution = getNextExecutionTime(horario);

    countdownInterval = setInterval(() => {
        const now = moment().tz('America/Sao_Paulo');
        const diff = nextExecution.diff(now);

        if (diff <= 0) {
            clearInterval(countdownInterval);
        } else {
            const duration = moment.duration(diff);
            const h = String(duration.hours()).padStart(2, '0');
            const m = String(duration.minutes()).padStart(2, '0');
            const s = String(duration.seconds()).padStart(2, '0');

            // Windows-friendly console
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(`⏳ Próximo envio em ${h}:${m}:${s}`);
        }
    }, 1000);
}

async function sendFeedback(config) {
    try {
        const { turma, aula, nomeGrupo } = config;
        const mensagem = feedbacks[turma]?.[aula] || "Nenhum feedback encontrado para essa turma e aula.";

        const chats = await client.getChats();
        const grupo = chats.find(
            chat => chat.isGroup && chat.name.trim().toLowerCase() === nomeGrupo.trim().toLowerCase()
        );

        if (grupo) {
            await client.sendMessage(grupo.id._serialized, `📚 Feedback da turma *${turma}* - aula *${aula}*:\n\n${mensagem}`);
            console.log(`\n✅ Feedback enviado para grupo "${grupo.name}"`);
        } else {
            console.log(`\n❌ Grupo "${nomeGrupo}" não encontrado.`);
        }
    } catch (err) {
        console.error('\nErro ao enviar feedback:', err);
    }
}

function scheduleTask(config) {
    if (scheduledTask) scheduledTask.stop();

    scheduledTask = cron.schedule(convertToCron(config.horario), () => {
        console.log('\n⏳ Enviando feedback agora!');
        sendFeedback(config);
        startCountdown(config.horario);
    }, { timezone: 'America/Sao_Paulo' });

    scheduledTask.start();
    startCountdown(config.horario);
}

// ==================== Monitorar config.json ====================
function watchConfig() {
    setInterval(() => {
        try {
            const config = loadConfig();
            if (!lastConfig || JSON.stringify(config) !== JSON.stringify(lastConfig)) {
                console.log('\n⚙ Configuração alterada. Atualizando cron e contagem regressiva...');
                lastConfig = config;
                scheduleTask(config);
            }
        } catch (err) {
            console.error('Erro ao ler config:', err);
        }
    }, 1000);
}

// ==================== Eventos do Bot ====================
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Escaneie o QR Code acima com o WhatsApp.');
});

client.on('ready', () => {
    console.log('🤖 Bot pronto!');
    lastConfig = loadConfig();
    scheduleTask(lastConfig);
    watchConfig();
});

client.initialize();
