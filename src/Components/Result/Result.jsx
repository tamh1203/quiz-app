import './Result.scss';
import { resultInitalState } from '../../constants';
const Result = (props)=>{

	const {questions, result} = props;

	const onTryAgain =()=>{
		props.setResult(resultInitalState); // set result => initalState
		props.setShowResult(false);
	}

	console.log("resultInitalState", resultInitalState);
	
	return(
		<div className="result">
		<h3>Result</h3>
			<p>Total Question :<span>{questions.length}</span>  </p>
			<p>Total Scored : <span>{result.score}</span> </p>
			<p>Total Corret Answers :<span>{result.correctAnswers}</span>  </p>
			<p>Total Wrong Answers : <span>{result.wrongAnswers}</span> </p>

			<button onClick={onTryAgain}> 
				Try Again
			</button>
		</div>
	)
}

export default Result;