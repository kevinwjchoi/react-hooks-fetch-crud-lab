import React, { useState , useEffect} from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [question, setQuestion] = useState([]);
  const [selectID, setSelectID] = useState();
  // const [updatedAnswer, setUpdatedAnswer] = useState();

  function onUpdateAnswer(updatedAnswer) {
    const updatedAnswers = question.map((question) => {
      if (question.id === updatedAnswer.id) {
        return updatedAnswer;
      } else {
        return question;
      }
    });
    setQuestion(updatedAnswers);
  }
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((res) => res.json())
    .then((questionData) => setQuestion(questionData)); 
  }, [])

  function handleAddQuestion(newQuestion){
    setQuestion([...question, newQuestion]);
  }

  function onDeleteQuestion(deletedItem){
    const updatedQuestionList = question.filter((question) => question.id !== deletedItem.id);
    setQuestion(updatedQuestionList);
  }



  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm question={question} onNewQuestion={handleAddQuestion}/> : <QuestionList question={question} onDeleteQuestion={onDeleteQuestion} onUpdateAnswer={onUpdateAnswer} setSelectID={setSelectID} selectID={selectID}/>}
    </main>
  );
}

export default App;
