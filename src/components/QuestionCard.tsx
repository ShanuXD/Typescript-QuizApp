import React from 'react'
import { AnswerObject } from '../App';

type Props ={
    question: string;
    answers: string[];
    callback: (event: React.MouseEvent<HTMLButtonElement>)=>void;
    userAnswer: AnswerObject | undefined;
    questionNo: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({question, answers, callback, questionNo, totalQuestions, userAnswer}) =>{
    return (
    <div className="QA_box">
        <p className="number">
            Question: {questionNo}/{totalQuestions}
        </p>
        <p className="question" dangerouslySetInnerHTML={{__html: question}}></p>
        <div>
            {answers.map(answer=>(
                <div key={answer}>
                    <button className='btn' disabled={userAnswer? true:false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{__html: answer}}></span>
                    </button>
                </div>
            ))}
        </div>
    </div>)
}

export default QuestionCard