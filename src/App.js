import './App.css';
import './style1.css';
import './style2.css';
import React from 'react';
import {useState, useContext} from 'react';
import { TodosContext } from "./contexts/todos";
import Todo from "./Todo";
import { TodosProvider } from "./contexts/todos.js";
import IMAGE_BACKGROUND from './Assets/a22.jpeg';

const Header = () =>{
  const [text, settext] = useState("");
  const [, dispatch] = useContext(TodosContext);
  const changetext = (event)=>{
    // console.log(event.target.value);
    settext(event.target.value)
  }
  const keyenter = (event)=>{
    const t1 = text.trim();
    if(event.keyCode == 13 && t1.length>0){
      const d = new Date();
      const a1 = d.getDate();
      const a2 = d.getMonth() + 1;
      const a3 = d.getFullYear();
    
      // console.log(text);
      dispatch({ type: "addTask", payload: t1+' '+`${a1}/${a2}/${a3}`+'(start-date)'});
      settext("");
    }
    
  }
  
  
  return(
    <header className='header'>
    <h1 style={{fontWeight:'480',color: "darkcyan"}}>TO-DO</h1>
    <input className = 'new-todo'
     placeholder='enter your task                 
     (press Enter)'
     style ={{color:"white", fontWeight:400}}
    onChange = {changetext}
    value = {text}
    autoFocus
    onKeyDown ={keyenter}/>
    
    {/* <p>{text}</p> */}
    </header>);
}


const Main = () => {
  const [todosState, dispatch] = useContext(TodosContext);
  const [editingId, setEditingId] = useState(null);
  const noTodosClass = todosState.todos.length === 0 ? "hidden" : "";
  const isAllTodosSelected = todosState.todos.every((todo) => todo.isCompleted);
  const getVisibleTodos = () => {
    if (todosState.filter === "active") {
      return todosState.todos.filter((todo) => !todo.isCompleted);
    } else if (todosState.filter === "completed") {
      return todosState.todos.filter((todo) => todo.isCompleted);
    }
    return todosState.todos;
  };
  const visibleTodos = getVisibleTodos();

  const onToggleAllTodos = (event) => {
    dispatch({ type: "toggleAll", payload: event.target.checked });
  };

  return (
    <section className={`main ${noTodosClass}`}>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={isAllTodosSelected}
        onChange={onToggleAllTodos}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {visibleTodos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            isEditing={editingId === todo.id}
            setEditingId={setEditingId}
          />
        ))}
      </ul>
    </section>
  );
};



const End = () => {
  const [todosState, dispatch] = useContext(TodosContext);
  const noTodosClass = todosState.todos.length === 0 ? "hidden" : "";
  const activeCount = todosState.todos.filter((todo) => !todo.isCompleted)
    .length;
  const itemsLeftText = ` item${activeCount !== 1 ? "s" : ""} left`;
  const getSelectedClass = (filterName) => {
    return todosState.filter === filterName ? "selected" : "";
  };
  const changeFilter = (event, filterName) => {
    event.preventDefault();
    dispatch({ type: "changeFilter", payload: filterName });
  };

  return (
    <footer className={`footer ${noTodosClass}`}>
      <span className="todo-count" style ={{color:"black", fontWeight:400}}>
        <strong style ={{color:"black", fontWeight:400}}>{activeCount}</strong>
        {itemsLeftText}
      </span>
      <ul className="filters" style ={{color:"black", fontWeight:400}}>
        <li>
          <a 
            href="/"
            className={getSelectedClass("all")}
            onClick={(event) => changeFilter(event, "all")}
          >
            All
          </a>
        </li>
        <li >
          <a 
            href="/"
            className={getSelectedClass("active")}
            onClick={(event) => changeFilter(event, "active")}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="/"
            className={getSelectedClass("completed")}
            onClick={(event) => changeFilter(event, "completed")}
          >
            Completed
          </a>
        </li>
      </ul>
    </footer>
  );
};



const App = () => {
  return (
    <TodosProvider>
      <div className="App" style={{backgroundImage:`url(${IMAGE_BACKGROUND})`}}>
      <Header/>
      <Main/>
      <End/>
      </div>
  </TodosProvider>
    
  );
}

export default App;
