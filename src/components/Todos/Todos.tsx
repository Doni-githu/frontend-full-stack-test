import { useContext } from 'react'
import List from '../List/List'
import FilterTodo from '../FilterTodo/FilterTodo'
import AddTodo from '../AddTodo/AddTodo'
import { context } from '../../context'
import { IContext, TodoAction, TodoStates } from '../../interfaces/types'
import ChangeTodo from '../ChangeTodo/ChangeTodo'
import './Todo.scss'
import Box from '../../uiComponents/Box/Box'
import { filterTodoHandler } from '../../utils'

const Todo = () => {
    const { state } = useContext(context) as IContext<TodoStates, TodoAction>
    const params = new URLSearchParams(window.location.search)
    return (
        <div className='py-5 todo'>
            <Box>
                <div className='fs-1 mb-2 text-center font-light'>Todo</div>
                <FilterTodo />
            </Box>
            <Box>
                {filterTodoHandler(state.todos, state.filter).length === 0 ? <>
                    <h1 className='text-center text-danger'>Not have {state.filter !== "all" ? state.filter : ""} todos </h1>
                </> : <List />}
            </Box>
            <div style={{ display: !state.isWantAdd ? "none" : "block" }}>
                <Box>
                    <AddTodo />
                </Box>
            </div>
            <div style={{ display: state.isWantChange || params.get('id') ? "block" : "none" }}>
                <Box>
                    <ChangeTodo />
                </Box>
            </div>
        </div>
    )
}

export default Todo