import React from "react"

const Loader = (props) => {
    return (
        <div style={{minHeight: '20px'}}>
            {props.loading ? <span>loading..</span> : null}
        </div>
    );
}

export default Loader