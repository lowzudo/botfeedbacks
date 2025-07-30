import React from 'react'
import styles from '../styles/styles.module.css'
import TimeInput from './timeinput.jsx'
import SelectTurma from './classinput.jsx'
import Button from './button.jsx'
import SelectAula from './auinput.jsx'


export default function Card({children}) {
    return (
        <div className={styles.card}>
            <div className={styles.card_conteudo}>
                <img src="https://mapadasfranquias.com.br/wp-content/uploads/2019/12/ctrllogo_884467.png" alt="Logo Ctrl+Play" className={styles.img} />
                <h1>BOT FEEDBACKS CTRL+PLAY</h1>
                <img src="https://mapadasfranquias.com.br/wp-content/uploads/2019/12/ctrllogo_884467.png" alt="Logo Ctrl+Play" className={styles.img} />
            </div>
                <div className={styles.div_select}>
                    <section className={styles.secao_select}>
                        <TimeInput/>
                        <SelectTurma/>
                        <SelectAula />
                    </section>
                </div>
                < Button/>
            {children}
        </div>
    )
}