import React from 'react';
import "./styles/style.scss";
import { useState} from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuestion, Difficulty, QuestionState  } from './API';

const TOTAL_QUESTION = 10

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

function App() {

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameover, setGameover] = useState(true)

  const startQuiz = async ()=>{
    setLoading(true)
    setGameover(false)
    try{

      const newQuestions = await fetchQuestion(TOTAL_QUESTION, Difficulty.EASY )
      setQuestions(newQuestions)
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);

    }catch(err){
      setLoading(false)
      setGameover(true)
      console.error(err);
      

    }
  }

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>)=>{

    if(gameover)return 
    const answer = event.currentTarget.value
    const correct = questions[number].correct_answer === answer
    if(correct) setScore(prevScore=>prevScore+1)
    // save answers
    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer,
    }
    setUserAnswers(prev=>[...prev, answerObject])


  }

  const nextQuestion = ()=>{
    const nextQuestion = number+1
    if(nextQuestion === TOTAL_QUESTION){ setGameover(true) }
    else{
      setNumber(nextQuestion)
    }
  }

  return (
    <main className="container">
      <h1>Quiz App</h1>
      {gameover || userAnswers.length===TOTAL_QUESTION ?
      ( <button className="play-btn btn"  onClick={startQuiz}>Start Game!</button>): null
      }
     
      {!gameover? <p className="score">Score:{score}</p>: null}
      {loading && <p className="loading">Loading Question....</p>}
      {!loading && !gameover && (
        <QuestionCard 
        questionNo={number+1} 
        totalQuestions={TOTAL_QUESTION}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
        />
      )}
      {!gameover && !loading && userAnswers.length === number+1  && number !== TOTAL_QUESTION - 1 ? (
        <button className="btn next-btn" onClick={nextQuestion}>Next Question</button>
      ): null}
      
    </main>
  );
}

export default App;
