import Quiz from "./Components/Quiz/Quiz"
import { jsQuizz } from "./constants"


const App = () => {

  return (
  <Quiz questions = {jsQuizz.questions} />
  )
}

export default App
