import React from 'react'
import styles from '../styles/inputs.module.css'

export default function SelectAula({ aulas, Au, setAu }) {
    return (
        <div className={styles.selectau}>
            <select
                value={Au}
                onChange={(e) => setAu(e.target.value)}
                className={styles.selectau_input}
            >
                <option value="" disabled>-- Escolha uma aula --</option>
                {aulas.map(aula => (
                    <option key={aula} value={aula}>
                        {aula}
                    </option>
                ))}
            </select>
        </div>
    )
}
