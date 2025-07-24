import { useState } from 'react'
import Card from './components/card.jsx'
import styles from '../src/styles/styles.module.css'


export default function App() {
    return (
        <div className= {styles.container}>
            <Card />
        </div>
    )
}

