import React from 'react'

const Todo = ({id, completed, text, onClick, onDelete}) => (
    <li>
        <span
            onClick={onClick}
            style={{
                textDecoration: completed ? 'line-through' : 'none'
            }}
        >{id}:{text} </span>
        <small onClick={onDelete}>x</small>
    </li>
)

export default Todo