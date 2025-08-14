import React from 'react'
import styles from '../styles/button.module.css'

export default function ButtonGroup({ onSave, onGenerateQr }) {
    return (
    <div className={styles.div_buttons}>
        <button className={styles.button} onClick={onSave}>Save the changes</button>
        <button className={styles.button} onClick={onGenerateQr}>Generate the Qr Code Here!</button>
    </div>
    )
}
