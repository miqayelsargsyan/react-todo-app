import React, {Component} from "react"
import axios from "axios"

import TodoItem from "./TodoComponent"

class Todo extends Component{
    constructor() {
        super()
        this.state = {
            todos: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleOnclick = this.handleOnclick.bind(this)
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/todos")
        .then(response => response.json())
        .then(response => {
            const todos = response
            console.log(todos)
            this.setState({
                todos: todos
            })

        })
    }

    handleOnclick(id) {
        axios.patch(`http://localhost:8000/api/complete/${id}`)
    }

    handleChange(id) {
        this.setState(prevState => {
            const updatedtodos = prevState.todos.map(todo => {
                if(todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
            return {
                todos: updatedtodos
            }
        }) 
    }

    render() {
        const todoItems = this.state.todos && this.state.todos.map(item => <TodoItem key={item.id} item={item} handleChange={this.handleChange}/>)
        return (
            <div className="todo-list">
                {todoItems}
                <div className="button">
                    {this.state.todos[0] && <button onClick={this.handleOnclick(this.state.todos[0]['_id'])}>SUBMIT</button>}
                </div>
            </div> 
        )    
    }
}

export default Todo

    