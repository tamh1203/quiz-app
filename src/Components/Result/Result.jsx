import './Result.scss';

const Result = (props)=>{

	const {questions, result, showResult} = props;

	const onTryAgain =()=>{
		props.setShowResult(false);
	}

	console.log("result", result);
	
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