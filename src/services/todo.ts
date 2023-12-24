import axios from "./axios"
import { TodoDto } from "../interfaces/types"

const Todo = {
    getAll() {
        return axios.get('/todo/all')
    },
    addTodo(todo: TodoDto) {
        return axios.post('/todo/create', todo)
    },
    deleteTodo(id: number) {
        return axios.delete(`/todo/${id}`)
    },
    updateTodo(id: number, todo: TodoDto) {
        return axios.put(`/todo/${id}`, todo)
    }
}

export default Todo