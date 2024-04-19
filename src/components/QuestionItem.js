import React, { useState } from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateAnswer}) {
  const { id, prompt, answers, correctIndex } = question;
  

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  

    

  function handleDeleteQuestion(){
  fetch(`http://localhost:4000/questions/${question.id}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    //whenever dealing with Delete Request, were not receiving any data back. Just letting the server know were deleting.
    .then(() => onDeleteQuestion(question));  //this question is coming from the props
  }
  
  function handleUpdateAnswer(event){
    const newValue = event.target.value;
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        correctIndex: newValue, 
      })
    })
    .then((res) => res.json())
    .then((question) => onUpdateAnswer(question));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdateAnswer}>{options}</select>
      </label>
      <button value={id}  onClick={handleDeleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
