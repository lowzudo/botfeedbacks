import React from 'react';
import styles from '../styles/inputs.module.css';

export default function TimeInput({ label = "Escolha um horário", value, onChange }) {
    return (
    <div className={styles.inputGroup}>
        <input
        id="time-input"
        type="time"
        value={value}
        onChange={e => onChange(e.target.value)}
        className={styles.input}
        required
        />
        <label htmlFor="time-input" className={`${styles.label} ${value ? styles.filled : ""}`}>
        {label}
        </label>
    </div>
    );
}
