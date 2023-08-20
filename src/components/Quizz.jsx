import React, { useState, useEffect } from "react";
import Questions from "./Questions";
import { nanoid } from 'nanoid'

function Quizz() {
    const [initialQuizz, setInitialQuizz] = useState([])
    const [quizz, setQuizz] = useState([])
    const [playAgain, setPlayAgain] = useState(false)
    const [newQuizz, setNewQuizz] = useState(false)
    console.log(quizz)
    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=11&type=multiple")
        .then((response) => response.json())
        .then(apiDatas => {
            setInitialQuizz(apiDatas.results);
        });
    }, [newQuizz])

    useEffect(() => {
        getQuizz()
    }, [initialQuizz])

    function randomizeAnswers(tab) {
        var i, j, tmp;
        for (i = tab.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            tmp = tab[i];
            tab[i] = tab[j];
            tab[j] = tmp;
        }
        return tab;
    }

    function getQuizz() {
        let answersArray = [], quizzArray = []
        for (let index = 0; index < initialQuizz.length; index++) {
            //On créé le tableau de réponses
            (initialQuizz[index].incorrect_answers).map(element => {
                answersArray.push(({id: nanoid(), answer: element, isSelected: false, isCorrect: false}))
            });
            answersArray.push(({id: nanoid(), answer: initialQuizz[index].correct_answer, isSelected: false, isCorrect: true}))
            randomizeAnswers(answersArray)

            //On ajoute au quizz les questions et réponses
            quizzArray.push(({
                id: nanoid(),
                question: initialQuizz[index].question,
                answers: answersArray,
                showResults: false
            }))
            answersArray = []
        }
        setPlayAgain(false)
        setQuizz(quizzArray)
    }

    function getNewQuizz() {
        setNewQuizz(!newQuizz)
    }

    function selectAnswer(questionId, answerId) {
        setQuizz(prevQuizz =>
            prevQuizz.map((question) => 
                question.id === questionId 
                ? { 
                    ...question,
                    answers: question.answers.map((answer) => 
                        answer.id === answerId 
                        ? {...answer, isSelected: true} 
                        : {...answer, isSelected: false}
                    )
                }
                : {...question}
            )
        )
    }

    function showResults() {
        setQuizz(prevQuizz => 
            (prevQuizz.map((question) => 
                ({...question,
                showResults: true})
                )
            )
        )
        setPlayAgain(true)
    }

    return (
        <div className="quizz">
            <div className="div--quizz">
                <div></div>
                <div></div>
                <div className="radius--right--quizz"></div>
            </div>
                <Questions quizz={quizz} selectAnswer={selectAnswer} />
                {   playAgain ?
                    <button className="button--quizz" onClick={() => getNewQuizz()}>Play Again</button> :
                    <button className="button--quizz" onClick={showResults}>Check Answers</button>
                }
            <div className="div--quizz">
                <div className="radius--left--quizz"></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Quizz