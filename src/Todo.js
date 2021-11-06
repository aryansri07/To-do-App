import { useEffect, useRef, useContext, useState } from "react";
import { TodosContext } from "./contexts/todos";

const Todo = ({ todo, isEditing, setEditingId }) => {
  const editingClass = isEditing ? "editing" : "";
  const completedClass = todo.isCompleted ? "completed" : "";
  const [, dispatch] = useContext(TodosContext);
  const [editText, setEditText] = useState(todo.text);
  const editInputEl = useRef(null);

  const setTodoInEditingMode = () => {
    setEditingId(todo.id);
  };
  const toggleTodo = () => {
    dispatch({ type: "toggleTodo", payload: todo.id });
  };
  const removeTodo = () => {
    dispatch({ type: "removeTodo", payload: todo.id });
  };
  const changeEditInput = (event) => {
    setEditText(event.target.value);
  };
  const keyDownEditInput = (event) => {
    if (event.keyCode === 13) {
      console.log("changeTodo", todo.id, event.target.value);

      dispatch({
        type: "changeTodo",
        payload: { id: todo.id, text: event.target.value },
      });
      setEditingId(null);
    }

    
  };

  useEffect(() => {
    if (isEditing) {
      editInputEl.current.focus();
    }
  });

  return (
    <li className={`${editingClass} ${completedClass}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.isCompleted}
          onChange={toggleTodo}
        />
        <label onDoubleClick={setTodoInEditingMode}>{todo.text}</label>
        <button className="destroy" onClick={removeTodo} />
      </div>
      {isEditing && (
        <input
          className="edit"
          ref={editInputEl}
          value={editText}
          onChange={changeEditInput}
          onKeyDown={keyDownEditInput}
        />
      )}
    </li>
  );
};

export default Todo;