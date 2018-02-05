import React from 'react';

const Key = (props) => {
    return(
      <button className={props.class} id={props.id} onClick={(e) => props.onPress(props.value)}>{props.value}</button>
    )
}

export default Key
