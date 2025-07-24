import React from 'react'
import styles from '../styles/styles.module.css'
import TimeInput from './timeinput.jsx'

export default function Card({children}) {
    return (
        <div className={styles.card}>
            <div className={styles.card_conteudo}>
                <img src="https://yt3.googleusercontent.com/ytc/AIdro_mFM6BvvXufEjZUzTpLCBBEc82PDb0X6eLN-CzDM_3YbvU=s900-c-k-c0x00ffffff-no-rj" alt="Logo Ctrl+Play" className={styles.img} />
                <h1>BOT FEEDBACKS CTRL+PLAY</h1>
                <img src="https://yt3.googleusercontent.com/ytc/AIdro_mFM6BvvXufEjZUzTpLCBBEc82PDb0X6eLN-CzDM_3YbvU=s900-c-k-c0x00ffffff-no-rj" alt="Logo Ctrl+Play" className={styles.img} />
            </div>
                <div className={styles.div_select}>
                    <section className={styles.secao_select}>
                        <TimeInput/>
                    </section>
                </div>
            {children}
        </div>
    )
}