import './Result.scss';
import { resultInitalState } from '../../constants';
import { useState, useEffect } from 'react';

const Result = (props)=>{
	const {questions, result} = props;
	const [name, setName ] = useState("");
	const [hightScores, setHightScores] = useState([]);
	const [showScore, setShowScore] = useState(false);

	useEffect(()=>{
		setHightScores(JSON.parse(localStorage.getItem("hightScores")) || []);
	},[])

	const hanldeSaveScore = ()=>{
		const score = {
			name:name,
			score : result.score,
		};
		let newHightScores = [...hightScores, score].sort((a,b) => b.score - a.score);
		setHightScores(newHightScores);
		setShowScore(true);
		localStorage.setItem("hightScores", JSON.stringify(newHightScores));
	}

	const onTryAgain =()=>{
		props.setResult(resultInitalState); // set result => initalState
		props.setShowResult(false);
		props.setInputAnswer('');
		setHightScores([]);
	}
	return(
		<div className="result">
		<>
		<h3>Kết quả thi</h3>
			<p>Tổng số câu hỏi :<span> {questions.length}</span>  </p>
			<p>Số điểm đạt được: <span> {result.score}</span> </p>
			<p>Số câu trả lời đúng :<span> {result.correctAnswers}</span>  </p>
			<p>Số câu trả lời  : <span> {result.wrongAnswers}</span> </p>
			<button onClick={onTryAgain}> 
			 Làm lại
			</button>
		</>
		{!showScore ?
		<>
		<h3>Enter your name bellow <br /> to save your score !</h3>
		<input 
			placeholder='Your name'
			value={name}
			onChange={(event)=>setName(event.target.value)}
		  />
		<button onClick={hanldeSaveScore}>Save</button>
		</>
		:
		<>
		<table className="table table-hover table-striped">
			<thead>
				<tr>
				<th scope="col">Ranking</th>
				<th scope="col">Name</th>
				<th scope="col">Score</th>
				</tr>
			</thead>
			<tbody>
				{hightScores && hightScores.length > 0 &&
				hightScores.map((hightScore, index)=>{
					return(
				<tr key={`${hightScore.scope}${index}`}>
					<td scope="row"	>{index + 1}</td>
					<td>{hightScore.name}</td>
					<td>{hightScore.score}</td>
				</tr>
					)
				})
				}
			</tbody>
		</table>
		</>
		}
		</div>
	)
}

export default Result;