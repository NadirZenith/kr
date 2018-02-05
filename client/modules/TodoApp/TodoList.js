import React from 'react'
import Todo from './Todo'

const TodoList = ({todos, onTodoClick, onDeleteClick}) => (
    <ul>
        {todos.map(todo => (
            <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} onDelete={() => onDeleteClick(todo.id)}/>
        ))}
    </ul>
)

export default TodoList