const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
const fs = require('fs');
const moment = require('moment-timezone');

const feedbacks = require('./data/feedbacks.json');

let countdownInterval = null;
let scheduledTask = null;
let lastConfig = null;

// ======================= Funções Utilitárias =======================
function loadConfig() {
    return JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
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

// ======================= Configuração do Cliente =======================
const client = new Client({
    authStrategy: new LocalAuth()
});

// ======================= Função Contagem Regressiva =======================
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
            const horas = String(duration.hours()).padStart(2, '0');
            const minutos = String(duration.minutes()).padStart(2, '0');
            const segundos = String(duration.seconds()).padStart(2, '0');

            process.stdout.write(`\r⏳ Próximo envio em ${horas}:${minutos}:${segundos} `);
        }
    }, 1000);
}

// ======================= Função para agendar o cron =======================
function scheduleTask(config) {
    if (scheduledTask) scheduledTask.stop();

    scheduledTask = cron.schedule(convertToCron(config.horario), async () => {
        try {
            const { turma, aula, nomeGrupo, horario } = loadConfig();
            const mensagem = feedbacks[turma]?.[aula] || "Nenhum feedback encontrado para essa turma e aula.";

            const chats = await client.getChats();
            const grupo = chats.find(chat => chat.isGroup && chat.name.trim().toLowerCase() === nomeGrupo.trim().toLowerCase());

            if (grupo) {
                await client.sendMessage(grupo.id._serialized, `📚 Feedback da turma *${turma}* - aula *${aula}*:\n\n${mensagem}`);
                console.log(`\n✅ Feedback enviado para grupo "${grupo.name}"`);
            } else {
                console.log(`\n❌ Grupo "${nomeGrupo}" não encontrado.`);
            }

            startCountdown(horario);
        } catch (err) {
            console.error('\nErro no envio:', err);
        }
    }, { timezone: 'America/Sao_Paulo' });

    scheduledTask.start();
    startCountdown(config.horario);
}

// ======================= Monitoramento do config =======================
function watchConfig() {
    setInterval(() => {
        try {
            const currentConfig = loadConfig();
            if (!lastConfig || JSON.stringify(currentConfig) !== JSON.stringify(lastConfig)) {
                console.log('\n⚙ Configuração alterada. Atualizando cron e contagem regressiva...');
                lastConfig = currentConfig;
                scheduleTask(currentConfig);
            }
        } catch (err) {
            console.error('Erro ao ler config:', err);
        }
    }, 1000); // verifica a cada segundo
}

// ======================= Eventos do Bot =======================
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
