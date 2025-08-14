import { useEffect, useState } from 'react';

export default function BotStatus() {
    const [status, setStatus] = useState({
        ready: false,
        qr: null,
        nextExecution: null
    });

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('http://localhost:3003/bot-status')
                .then(res => res.json())
                .then(data => setStatus(data))
                .catch(err => console.error('Erro ao buscar status do bot:', err));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            {!status.ready && status.qr && (
                <>
                    <h2>📲 Escaneie o QR Code com seu WhatsApp</h2>
                    <img src={status.qr} alt="QR Code do WhatsApp" style={{ width: '250px', height: '250px' }} />
                </>
            )}

            {status.ready && <h2>🤖 Bot pronto!</h2>}

            {status.nextExecution && <p>⏳ Próximo envio: {status.nextExecution}</p>}
        </div>
    );
}