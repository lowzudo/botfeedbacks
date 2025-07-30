import React from 'react';
import useFeedbacks from '../hooks/useFeedbacks'; 
import styles from '../styles/inputs.module.css'; 

export default function SelectAula() {
    const { aulas, Au, setAu } = useFeedbacks();

    return (
        <div className="selectau">
            <select
                id="aula"
                value={Au}
                onChange={(e) => setAu(e.target.value)}
                className={styles.selectau_input}
            >
                <option value="" disabled>-- Escolha uma aula --</option>
                {aulas.map((aula) => (
                    <option key={aula} value={aula}>
                        {aula}
                    </option>
                ))}
            </select>
        </div>
    );
}
