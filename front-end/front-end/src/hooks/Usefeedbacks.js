import { useState, useEffect } from 'react';

export default function useFeedbacks() {
    const [feedbacks, setFeedbacks] = useState({});
    const [aulas, setAulas] = useState([]);
    const [Au, setAu] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/feedbacks')
            .then(res => res.json())
            .then(data => {
                console.log('Dados completos recebidos:', data);
                setFeedbacks(data);

                // Pega a primeira turma e extrai as aulas
                const primeiraTurma = Object.values(data)[0];
                if (primeiraTurma) {
                    const chavesDeAulas = Object.keys(primeiraTurma);
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
    };
}
