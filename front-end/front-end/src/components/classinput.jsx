import React from 'react'
import styles from '../styles/inputs.module.css'
import useFeedbacks from '../hooks/Usefeedbacks'

export default function SelectTurma() {
    const {
    feedbacks,
    turmaSelecionada,
    setTurmaSelecionada,
    Au,
    setAu,
    } = useFeedbacks();

    const turmas = Object.keys(feedbacks);

    const handleChange = (e) => {
    setTurmaSelecionada(e.target.value);
    };

    return (
    <div className={styles.selectclass}>
        <select
        className={styles.selectclass_input}
        value={turmaSelecionada}
        onChange={handleChange}
        disabled={turmas.length === 0}
        >
        <option value="" disabled>-- Escolha uma turma --</option>
        {turmas.map((turma, index) => (
            <option key={index} value={turma}>
            {turma}
            </option>
        ))}
        </select>
    </div>
    );
}
