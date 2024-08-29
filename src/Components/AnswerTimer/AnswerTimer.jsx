import './AnswerTimer.scss';
import { useEffect, useState, useRef} from 'react';

const AnswerTimer = ({duration, onTimeUp})=>{
    const [counter, setCounter] = useState(0);
    const [progressLoader, setProgressLoader] = useState(0);
    const intervalRef = useRef();

    useEffect(()=>{
        intervalRef.current = setInterval(()=>{
            setCounter((cur)=> cur + 1)
        },1000);
        return () => clearInterval(intervalRef.current);
    },[])
  
    useEffect(()=>{
        setProgressLoader(100*(counter /duration) )

        if(counter === duration ){
            clearInterval(intervalRef.current);

            setTimeout(()=>{
                onTimeUp();
            },1000);
        }
    },[counter])

    console.log(counter);
    
    return(
        <div className='answer-timer-container'>
            <div 
            style={{
                width: `${progressLoader}%`,
                backgroundColor:`${
                    progressLoader < 40 
                    ? "lightgreen" 
                    : progressLoader < 70 
                    ? "orage"
                    : "red"
                }`
            }}
            className='progress'>
            </div>
        </div>
    )
}

export default AnswerTimer;