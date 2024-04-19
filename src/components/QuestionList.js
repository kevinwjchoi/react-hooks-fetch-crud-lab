import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({question, setSelectID, selectID, onDeleteQuestion, onUpdateAnswer}) {
  const questionMap = question.map((eachQuestion) => {
    return <QuestionItem question={eachQuestion} onDeleteQuestion={onDeleteQuestion} onUpdateAnswer={onUpdateAnswer} key={eachQuestion.id} setSelectID={setSelectID} selectID={selectID}/>
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionMap}</ul>
    </section>
  );
}

export default QuestionList;
