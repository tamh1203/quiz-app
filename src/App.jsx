import Quiz from "./Components/Quiz/Quiz";
import { useEffect, useState } from "react";


const App = () => {
    const [questions, setQuestions] = useState([]);

  useEffect(()=>{
    getQuestions();
  },[])

  const getQuestions = async()=>{
      try{
        let res = await fetch('https://66cfe2c0181d059277dc8cf9.mockapi.io/questions');
        let dataQuestion = await res.json();
        console.log("check res", dataQuestion);
        setQuestions(dataQuestion);
      }catch(error){
        console.log(error);
      }
  }
  console.log(questions);
  
  return (
     questions.length && <Quiz questions = {questions} />
  )
}

export default App
