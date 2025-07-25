import React from 'react';
import feedbacks from '../data/feedbacks.json';
import styles from '../styles/inputs.module.css'

export default function SelectTurma() {
    const turmas = Object.keys(feedbacks);

    return (
    <div className={styles.selectclass}>
        <select className={styles.selectclass_input} defaultValue="">
        <option value="" disabled>-- Escolha uma turma --</option>
        {turmas.map((turma, i) => (
            <option key={i} value={turma}>
            {turma}
            </option>
        ))}
        </select>
    </div>
    );
}
