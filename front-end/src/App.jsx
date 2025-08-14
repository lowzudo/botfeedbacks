import { useState } from 'react'
import Card from './components/card.jsx'
import styles from '../src/styles/styles.module.css'
import BotStatus from './components/BotStatus.jsx'


export default function App() {
    return (
        <div className= {styles.container}>
            <Card />
            <BotStatus />
        </div>
    )
}

