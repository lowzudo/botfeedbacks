import React from 'react'
import styles from '../styles/button.module.css'

export default function Button({children, onClick}){
    return (
        <div className={styles.div_buttons}>
            <button className={styles.button} onClick = {onClick}>Save the changes</button>
            <button className={styles.button} onClick = {onClick}>Generate the Qr Code Here!</button>
        </div>
    )
}