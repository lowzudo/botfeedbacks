import { useState } from 'react'
import styles from '../styles/timeinput.module.css'

export default function TimeInput({ label = "Escolha um horário", onChange }) {
    const [value, setValue] = useState("")

    const handleChange = (e) => {
        setValue(e.target.value)
        if (onChange) onChange(e.target.value)
    }

    return (
        <div className={styles.inputGroup}>
            <input
                type="time"
                value={value}
                onChange={handleChange}
                className={styles.input}
                required
            />
            <label className={`${styles.label} ${value && styles.filled}`}>
                {label}
            </label>
        </div>
    )
}