import React from 'react'
import Todo from './Todo'

export default function TodoList(props) {
  return (
    props.todos.map((todo,index)=>{
        return <Todo todo={todo} setTodo={props.setTodo} toggledTodos={props.toggledTodos} key={index}/>
    })
  )
}
