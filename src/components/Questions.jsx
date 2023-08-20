import React from "react";
import he from "he"
import Answers from "./Answers";

function Questions(props) {
    let questions = []
    for (let index = 0; index < props.quizz.length; index++) {
        questions.push(
            <div className="div--main--question" key={index}>
                <h1 className="h1--question" key={props.quizz[index].id}>{he.decode(props.quizz[index].question)}</h1>
                <div className="div--answers">
                    <Answers question={props.quizz[index]} selectAnswer={props.selectAnswer} />
                </div>
                <hr className="hr--question"></hr>
            </div>
        )
    }
    return questions
}

export default Questions