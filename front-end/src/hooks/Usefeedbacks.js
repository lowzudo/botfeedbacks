import { useState, useEffect } from 'react';

export default function useFeedbacks() {
    const [feedbacks, setFeedbacks] = useState({});
    const [aulas, setAulas] = useState([]);
    const [Au, setAu] = useState('');
    const [turmaSelecionada, setTurmaSelecionada] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/feedbacks')
            .then(res => res.json())
            .then(data => {
                console.log('Dados completos recebidos:', data);
                setFeedbacks(data);

                const primeiraTurma = Object.keys(data)[0];
                if (primeiraTurma) {
                    setTurmaSelecionada(primeiraTurma); // <-- seta a primeira turma por padrão
                    const chavesDeAulas = Object.keys(data[primeiraTurma]);
                    setAulas(chavesDeAulas);
                    setAu(chavesDeAulas[0] || '');
                }
            })
            .catch(err => console.error('Erro ao carregar feedbacks:', err));
    }, []);

    return {
        feedbacks,
        aulas,
        Au,
        setAu,
        turmaSelecionada,
        setTurmaSelecionada, // <- aqui está o que faltava
    };
}
