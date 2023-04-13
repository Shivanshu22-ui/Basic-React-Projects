import React from "react";

export default function Todo({ todo ,setTodo,toggledTodos}) {
  function handleTodo(){
    toggledTodos(todo.id);
  }
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodo}
        />
        {todo.name}

       </label>
    </div>
  );
}
