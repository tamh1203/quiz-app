import { useState } from "react";
import {resultInitalState} from "./constants"
import Result from "./Components/Result";
const Quiz = ({questions})=>{

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answerIdx, setAnserIdx] = useState(null);
	const [answer, setAnswer] = useState(null);
	const [result, setResult] = useState(resultInitalState);
	const [showResult, setShowResult] = useState(false);

	const {question, choices, correctAnswer} = questions[currentQuestion];

	const onAnswerClick = (choices, index)=> {
		setAnserIdx(index);
		if(choices === correctAnswer){
			setAnswer(true);
		}else{
			setAnswer(false);
		}
	}
	
	const onClickNext =()=>{
		setAnserIdx(null);

		setResult((prev)=>
			answer ? {
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
	}
	
	// console.log("currentQuestion", currentQuestion);
	
	return(
		<div className="quiz-container">
		{!showResult ? 	
		(<>
			<span className="active-question"> {currentQuestion + 1}</span>
			<span className="total-question">/{questions.length}</span>
			<h2>{question}</h2>
				<ul>
					{
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
			<div className="footer">
				<button 
					disabled={answerIdx===null}
					onClick={onClickNext}
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
			showResult= {showResult}
			setShowResult={setShowResult}
			 />
	 </div>
	 }
	</div>
	)	
}

export default Quiz;