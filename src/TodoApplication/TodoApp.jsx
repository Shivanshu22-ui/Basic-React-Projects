import React,{useState,useRef,useEffect} from 'react'
import TodoList from "./TodoList";
const localStorageKey = "TODOAPP.TODO";

export default function TodoApp() {
    const [todos,setTodos]=useState([]);
  const todoNameRef=useRef();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(localStorageKey));
     setTodos(data);
  },[])

 useEffect(() => { 
   localStorage.setItem(localStorageKey,JSON.stringify(todos));
 },[todos])

 function handleAddTodos(e) { 
   const name = todoNameRef.current.value;
   if (name==="") return;
   setTodos(prev=>{
    return [...prev,{id:Date.now(),name:name,complete:false}]
   })
  todoNameRef.current.value="";
}

function clearTodo(){
  const newTodo = todos.filter(todo=>todo.complete===false);
  setTodos(newTodo);
}

function toggledTodos(id){


  // const newTodos=todos.map(todo=>{
  //   if(todo.id===id){
  //     todo.complete=!todo.complete;
  //   }
  //   return todo;    
  // });


  const newTodos= [...todos];
  const todo = newTodos.find(todo=>todo.id===id);
  todo.complete=!todo.complete;
  setTodos(newTodos);
  console.log(newTodos);
}

  return (
    <div>
        <TodoList todos = {todos} toggledTodos={toggledTodos} setTodos={setTodos}/>
      <input type="text" ref= {todoNameRef}/>
      <button onClick={handleAddTodos} >Add Todos</button>
      <button onClick={clearTodo}>Clear Todos</button>
      <div>{todos.filter(todo=>(todo.complete===false)).length} left todos</div>
    </div>
  )
}
