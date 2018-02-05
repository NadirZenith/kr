import React from "react"

class AddTodo extends React.Component {
    componentDidMount() {
        this.input.focus();
    }

    render() {
        return (
            <form className="AddTodo" onSubmit={this.props.onSubmit}>
                <input ref={node => this.input = node} value={this.props.defaultTerm} onChange={this.props.onChange}/>
                <button>Submit</button>
            </form>
        )
    }
}

export default AddTodo
