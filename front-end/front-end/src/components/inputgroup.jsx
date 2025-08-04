import React from 'react';
import styles from '../styles/inputs.module.css';

export default function InputGroup({ nomeGrupo, setNomeGrupo }) {
    return (
    <div className={styles.div_inputgroup}>
        <input
        className={styles.input_inputgroup}
        type="text"
        id="input"
        value={nomeGrupo}
        onChange={(e) => setNomeGrupo(e.target.value)}
        />
        <label className={styles.label_inputgroup} htmlFor="input">
        Nome do Grupo
        </label>
    </div>
    );
}
