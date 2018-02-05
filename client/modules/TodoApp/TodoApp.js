import React from "react"
import Footer from "./Footer"
import AddTodo from "./AddTodo"
import * as api from "./api"
import TodoList from './TodoList'
import Loader from './Loader'
import {SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED} from './Constants'

class TodoApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibilityFilter: props.visibilityFilter,
            todos: [],
            term: props.term,
            loading: true
        }

        // note handleFilterClick action if want to avoid bidding (experimental)
        this.handleTodoClick = this.handleTodoClick.bind(this)
    }

    componentDidMount() {
        // this.setState({loading: true}) // loading is the initial state
        api.getTodos(data => this.setState({loading: false, todos: data}))
    }

    handleTodoClick(id) {
        this.setState({loading: true})
        const remainder = this.state.todos.filter((todo) => {
            if (todo.id === id) {
                const completed = todo.completed = !todo.completed
                api.updateTodo({id: id, completed: completed}, data => {
                    // data is the updated todo
                    this.setState({loading: false})
                })
            }
            return todo
        })

        this.setState({todos: remainder})
    }

    handleFilterClick = (filter) => {
        this.setState({loading: true})

        let remainder = [];
        api.getTodos(data => {
            switch (filter) {
                case SHOW_COMPLETED:
                    remainder = data.filter(t => t.completed)
                    break
                case SHOW_ACTIVE:
                    remainder = data.filter(t => !t.completed)
                    break
                case SHOW_ALL:
                default:
                    remainder = data
                // show all
            }

            this.setState({
                loading: false,
                visibilityFilter: filter,
                todos: remainder
            })
        })
    }

    onSubmit = (event) => {
        event.preventDefault()

        if (!this.state.term) {
            return
        }

        this.setState({loading: true})
        api.addTodo({text: this.state.term}, data => {
            this.setState({
                loading: false,
                term: '',
                todos: [...this.state.todos, data]
            });
        })
    }

    onChange = (event) => {
        this.setState({term: event.target.value});
    }

    handleDelete = (id) => {
        this.setState({loading: true})
        let remainder = this.state.todos

        remainder = remainder.filter(t => t.id !== id)

        api.deleteTodo(id, data => {
            this.setState({
                loading: false,
                todos: remainder
            });
        })
    }

    render() {
        return (
            <div>
                <div>{this.props.title} - {this.state.visibilityFilter} ({this.state.todos.length})</div>
                <AddTodo
                    defaultTerm={this.state.term}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                />
                <Loader
                    loading={this.state.loading}
                />
                <TodoList
                    todos={this.state.todos}
                    onTodoClick={this.handleTodoClick}
                    onDeleteClick={this.handleDelete}
                />
                <Footer
                    currentFilter={this.state.visibilityFilter}
                    onFilterClick={this.handleFilterClick}
                />
            </div>
        )
    }
}

export default TodoApp
