import React from "react";
import he from "he"

function Answers(props) {
    let answers = []
    if (props.question.showResults) {
        props.question.answers.map(element =>
            answers.push(
                <button id={(element.id)} key={(element.id)} className={(element.isSelected && element.isCorrect ? 
                            "button--answer correct" 
                            : element.isSelected && !element.isCorrect ? 
                            "button--answer wrong"
                            : element.isCorrect ? 
                            "button--answer correct"
                            : "button--answer")}
                        onClick={() => props.selectAnswer(props.question.id, element.id)} >
                    {he.decode(element.answer)}
                </button>
            )
        )
    }
    else {
        props.question.answers.map(element =>
            answers.push(
                <button id={(element.id)} key={(element.id)} className={(element.isSelected ? 
                            "button--answer selected" : "button--answer")}
                        onClick={() => props.selectAnswer(props.question.id, element.id)} >
                    {he.decode(element.answer)}
                </button>
            )
        )
    }
    
    return answers
}

export default Answers