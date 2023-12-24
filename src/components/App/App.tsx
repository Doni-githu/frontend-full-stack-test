import React, { useContext, useEffect } from 'react'
import Todo from '../Todos/Todos'
import TodoService from "../../services/todo"
import './App.scss'
import { context } from '../../context'
import { IContext, TodoAction, TodoStates } from '../../interfaces/types'
const App: React.FC = () => {
  const { dispatch } = useContext(context) as IContext<TodoStates, TodoAction>
  useEffect(() => {
    TodoService.getAll()
      .then(res => {
        console.log(res.data)
        dispatch({ type: 'CHANGE_ACTIVE', payload: { key: 'todos', value: res.data } })
      })
  }, [])
  return (
    <main>
      <Todo />
    </main>
  )
}



export default App