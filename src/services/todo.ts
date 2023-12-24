import axios from "./axios"
import { TodoDto2 } from "../interfaces/types"

const Todo = {
    getAll() {
        return axios.get('/todo/all')
    },
    addTodo(todo: TodoDto2) {
        return axios.post('/todo/create', todo)
    },
    deleteTodo(id: number) {
        return axios.delete(`/todo/${id}`)
    },
    updateTodo(id: number, todo: any) {
        return axios.put(`/todo/${id}`, todo)
    }
}

export default Todo