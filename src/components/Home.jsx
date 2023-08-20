import React, { useState, useEffect } from "react";
import Quizz from "./Quizz";

function Home() {  
    const [startQuizz, setStartQuizz] = useState(false)

    function launchQuizz() {
        setStartQuizz(prevState => !prevState.startQuizz)
    }
    
    if (startQuizz) {
        return <Quizz startQuizz={startQuizz} />
    }
    else {
        return (
            <div className="Home">
                <div className="div--home">
                    <div></div>
                    <div></div>
                    <div className="radius--right--home"></div>
                </div>
                <div className="div--main--home">
                    <h1 className="h1--home">Quizzical</h1>
                    <h2 className="h2--home">Ultimate Trivial Pursuit</h2>
                    <button className="button--home" onClick={launchQuizz}>Start Quizz</button>
                </div>
                <div className="div--home">
                    <div className="radius--left--home"></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }
}

export default Home