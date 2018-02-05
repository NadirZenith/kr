import React from 'react'
// import * as todoActionsFilters from './constants';
import {SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED} from './Constants'

const Link = ({active, children, onClick}) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
      <a href=""
         onClick={e => {
           e.preventDefault()
           onClick()
         }}
      >
        {children}
      </a>
  )
}
const Footer = (props) => (
    <p>
      Show:{''}
      <Link active={props.currentFilter === SHOW_ALL} onClick={() => props.onFilterClick(SHOW_ALL)}>
        All
      </Link>{', '}
      <Link active={props.currentFilter === SHOW_ACTIVE} onClick={() => props.onFilterClick(SHOW_ACTIVE)}>
        Active
      </Link>
      {', '}
      <Link active={props.currentFilter === SHOW_COMPLETED} onClick={() => props.onFilterClick(SHOW_COMPLETED)}>
        Completed
      </Link>
    </p>
)

export default Footer