import React, { useState, useEffect, useRef } from "react";
import FlashCardList from "./FlashCardList";
import "./FlashCardApp.css";
import axios from "axios";

export default function FlashCardApp() {
  const [flashcards, setFlashcards] = useState([]);
  const [category, setCategory] = useState([]);
//   const [questions, setQuestions] = useState(10);
  const categoryRef = useRef();
  const amountref = useRef();

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      console.log(res.data.trivia_categories);
      setCategory(res.data.trivia_categories);
    });
  }, []);

  useEffect(() => {
    
  }, []);

  function decodeText(str) {
    let text = document.createElement("textArea");
    text.innerHTML = str;
    return text.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios  
      .get('https://opentdb.com/api.php', {
        params:{
            amount: amountref.current.value,
            category: categoryRef.current.value
        }
      })
      .then((res) => {
        console.log(res);
        setFlashcards(
          res.data.results.map((questionItem, index) => {
            const answer = decodeText(questionItem.correct_answer);
            const option = [
              ...questionItem.incorrect_answers.map((a) => decodeText(a)),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeText(questionItem.question),
              answer: answer,
              options: option.sort(() => Math.random() - 0.5),
            };
          })
        );
      });
  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select ref={categoryRef} id="category">
            {category.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of questions</label>
          {/* <input type="number" id="amount" onChange={(e)=> setQuestions(e.target.value)} />  */}
          {/* // to change the amount of questions on input change */}
          <input
            type="number"
            id="amount"
            min={1}
            step={1}
            defaultValue={10}
            ref={amountref}
          />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div>
        <FlashCardList flashcards={flashcards} />
      </div>
    </>
  );
}
