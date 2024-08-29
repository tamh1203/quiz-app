import { useState } from "react";
import {resultInitalState} from "../../constants";
import Result from "../Result/Result";
import "./Quiz.scss";
import AnswerTimer from "../AnswerTimer/AnswerTimer";
const Quiz = ({questions})=>{

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answerIdx, setAnserIdx] = useState(null);
	const [answer, setAnswer] = useState(null);
	const [result, setResult] = useState(resultInitalState);
	const [showResult, setShowResult] = useState(false);
	const [showAnswerTimer, setShowAnswerTimer] = useState(true);
	const [inputAnswer, setInputAnswer] = useState('');

	const {question, choices, correctAnswer, type} = questions[currentQuestion];

	const onAnswerClick = (choices, index)=> {
		setAnserIdx(index);
		if(choices === correctAnswer){
			setAnswer(true);
		}else{
			setAnswer(false);
		}
	}
	
	const onClickNext =(finalAnswer)=>{
		setAnserIdx(null);
		setShowAnswerTimer(false);

		setResult((prev)=>
			finalAnswer ? {
				...prev,
				score: prev.score + 5,
				correctAnswers: prev.correctAnswers + 1,
				}
				:
				{
				...prev,
				wrongAnswers: prev.wrongAnswers + 1,
			})

			// set next question
			if(currentQuestion !== questions.length - 1){
				setCurrentQuestion((prev) => prev + 1)
			}else{
				setCurrentQuestion(0)
				setShowResult(true);
			}
			setTimeout(()=>{
				setShowAnswerTimer(true);
			},1000)
	}
	
	const hanleTimeUp = ()=>{
		setAnswer(false);
		onClickNext(false);
	}
    
	const getAnswerUI =()=>{
		if(type === "FBI"){
			return <input 
			value={inputAnswer}
			onChange={hanldInputAnswer}
			  />
		}
		return(
			<ul>
		{
		choices && choices.length > 0 &&
			choices.map((choices, index)=>{
				return(
					<li 
						key={choices}
						onClick={()=> onAnswerClick(choices, index)}
						className={answerIdx === index ? "selected-answer" : null}
						>
						{choices}
					</li>
		)})
		}
	</ul>
		)	
	}

	const hanldInputAnswer = (event)=>{
		setInputAnswer(event.target.value);
		if(event.target.value === correctAnswer ){
			setAnswer(true);
		}else{
			setAnswer(false);
		}
	}

	return(
		<div className="quiz-container">
		{!showResult ? 	
		(<>
			{showAnswerTimer && 
			<AnswerTimer 
				duration={5}
			 	onTimeUp = {hanleTimeUp}
			 	setResult = {setResult}
			 />}
			<span className="active-question"> {currentQuestion + 1}</span>
			<span className="total-question">/{questions.length}</span>
			<h2>{question}</h2>
				{getAnswerUI()}
			<div className="footer">
				<button 
					disabled={answerIdx===null && !inputAnswer }
					onClick={()=>onClickNext(answer)}
					>
					{currentQuestion === questions.length - 1 ? "Finish" : "Next"}
				</button>
			</div>				
		</>	)
	 : 
	 <div>
		<Result 
			questions = {questions}
			result = {result}
			setResult = {setResult}
			setShowResult={setShowResult}
			setInputAnswer={setInputAnswer}
			 />
	 </div>
	 }
	</div>
	)	
}

export default Quiz;