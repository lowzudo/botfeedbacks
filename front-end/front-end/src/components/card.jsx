import React, { useState } from 'react'
import styles from '../styles/styles.module.css'
import TimeInput from './timeinput.jsx'
import SelectTurma from './classinput.jsx'
import ButtonGroup from './button.jsx'
import SelectAula from './auinput.jsx'
import InputGroup from './inputgroup.jsx'
import useFeedbacks from '../hooks/Usefeedbacks'

export default function Card({ children }) {
    const { feedbacks, aulas, Au, setAu } = useFeedbacks()

    const [nomeGrupo, setNomeGrupo] = useState('')
    const [turmaSelecionada, setTurmaSelecionada] = useState('')
    const [horarioSelecionado, setHorarioSelecionado] = useState('')

    const handleEnviar = () => {
        if (!nomeGrupo || !turmaSelecionada || !Au || !horarioSelecionado) {
            alert('Por favor, preencha todos os campos antes de enviar.')
            return
        }

        fetch('http://localhost:3002/configurar-envio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nomeGrupo,
                turma: turmaSelecionada,
                aula: Au,
                horario: horarioSelecionado,
            }),
        })
            .then(res => res.json())
            .then(data => alert(data.status))
            .catch(err => alert('Erro ao enviar configuração: ' + err.message))
    }

    const handleGerarQr = () => {
        alert('Função para gerar QR não implementada ainda.')
    }

    return (
        <div className={styles.card}>
            <div className={styles.card_conteudo}>
                <img
                    src="https://mapadasfranquias.com.br/wp-content/uploads/2019/12/ctrllogo_884467.png"
                    alt="Logo Ctrl+Play"
                    className={styles.img}
                />
                <h1>BOT FEEDBACKS CTRL+PLAY</h1>
                <img
                    src="https://mapadasfranquias.com.br/wp-content/uploads/2019/12/ctrllogo_884467.png"
                    alt="Logo Ctrl+Play"
                    className={styles.img}
                />
            </div>
            <div className={styles.div_select}>
                <section className={styles.secao_select}>
                    <TimeInput value={horarioSelecionado} onChange={setHorarioSelecionado} />
                    <SelectTurma
                        turmaSelecionada={turmaSelecionada}
                        setTurmaSelecionada={setTurmaSelecionada}
                        feedbacks={feedbacks}
                    />
                    <SelectAula aulas={aulas} Au={Au} setAu={setAu} />
                    <InputGroup nomeGrupo={nomeGrupo} setNomeGrupo={setNomeGrupo} />
                </section>
            </div>
            <ButtonGroup onSave={handleEnviar} onGenerateQr={handleGerarQr} />
            {children}
        </div>
    )
}
