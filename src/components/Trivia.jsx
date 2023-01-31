import { useEffect } from "react"
import { useState } from "react"
import useSound from "use-sound"
import playquestion from "../assets/question.mp3"
import correct from "../assets/correct.mp3"
import wrong from "../assets/wrong.mp3"

export default function Trivia({ data, setStop, setQuestionNumber, questionNumber }) {

    const [question, setQuestion] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [className, setClassName] = useState("answer")
    const [playques] = useSound(playquestion)
    const [correctans] = useSound(correct)
    const [wrongans] = useSound(wrong)

    useEffect(()=>{
        playques()
    },[playques])
  
    useEffect(() => {
        setQuestion(data[questionNumber - 1])
    }, [data, questionNumber])

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback()
        }, duration);
    }

    const handleClick = (a) => {
        setSelectedAnswer(a)
        setClassName('answer active')
        delay(2000, () => setClassName(a.correct ? "answer correct" : "answer wrong"))
        delay(4000, () => {
            if (a.correct) {
                correctans()
                delay(1000, ()=> {
                    setQuestionNumber(prev => prev + 1)
                    setSelectedAnswer(null)
                })
            } else {
                wrongans()
                delay(1000, ()=>{
                    setStop(true)
                })
            }
        })
    }

    return (
        <div className="Trivia">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question?.answers.map((a) => {
                    return (
                        <div className={selectedAnswer === a ? className : "answer"} onClick={() => handleClick(a)}>{a.text}</div>
                    )
                })}
            </div>
        </div>
    )
}
