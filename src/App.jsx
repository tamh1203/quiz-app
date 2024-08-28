import Quiz from "./Quiz"
import { jsQuizz } from "./constants"


const App = () => {

  return (
  <Quiz questions = {jsQuizz.questions} />
  )
}

export default App
