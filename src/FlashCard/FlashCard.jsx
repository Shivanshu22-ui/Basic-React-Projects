import React, { useState, useEffect, useRef } from "react";

export default function FlashCard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  const [height,setHeight] = useState('initial');
  

  const frontEl = useRef();
  const backEl = useRef();
  function calculateHeight() {

    const fheight = frontEl.current.getBoundingClientRect().height;
    const bheight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(fheight, bheight, 100));
  }

  useEffect(
 calculateHeight,
    [flashcard.question, flashcard.answer, flashcard.options]
  );

  useEffect(()=>{
window.addEventListener('resize',calculateHeight);
return () => window.removeEventListener('resize',calculateHeight);
  },[])

  return (
    <div
      onClick={() => setFlip(!flip)}
      className={`card ${flip ? "flip" : ""}`}
      style={{height:height}}
    >
      
        <div className="front" ref={frontEl} style={{opacity: flip? 0:1}}>
          {flashcard.question}
          <div className="flashcard-options">
            {flashcard.options.map((option, index) => {
              return (
                <div className="flashcard-option" key={index}>
                  {index + 1}.{option}
                </div>
              );
            })}
          </div>
          
        </div>
        
        <div className="back" style={{opacity: !flip? 0:1}} ref={backEl}>
          {flashcard.answer}
        </div>

    </div>
  );
}
