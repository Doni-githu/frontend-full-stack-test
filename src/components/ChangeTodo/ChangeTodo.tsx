import {
    useState,
    useContext,
    memo,
    useEffect
} from 'react'
import TextArea from '../../uiComponents/TextArea/TextArea'
import { context } from '../../context'
import { IContext, TodoAction, TodoDto, TodoStates } from '../../interfaces/types'
import Input from '../../uiComponents/Input/Input'
import Todo from '../../services/todo'

const ChangeTodo = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [errorDescription, setErrorDescription] = useState('')
    const [errorTitle, setErrorTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const { dispatch, state } = useContext(context) as IContext<TodoStates, TodoAction>
    const params = new URLSearchParams(window.location.search)
    const id = Number(params.get("id"))
    useEffect(() => {
        const todo = state.todos.find((item) => item.id === id)
        if (todo) {
            setTitle(todo.title)
            const description = todo.description.split("<p>").slice(1).join('').split("</p>").reverse().slice(1).reverse().join("\n")
            setDescription(description)
        } else {
            window.history.pushState(null, '', window.location.pathname)
        }
    }, [id])
    const addTodoHandler = async () => {
        if (!title || !description) {
            return
        }

        const payload: TodoDto = {
            title,
            description: description.split('\n').map((item) => '<p>' + item + "</p>").join('')
        }

        try {
            setLoading(true)
            const { data } = await Todo.updateTodo(id, payload)
            setDescription('')
            setTitle('')
            dispatch({ type: "CHANGE_TODO", payload: data[0] })
            dispatch({ type: "CHANGE_ACTIVE", payload: { key: 'isWantChange', value: false } })
        } catch (error: any) {
            if (error?.response.status === 404) {
                params.delete('id')
                dispatch({ type: "CHANGE_ACTIVE", payload: { key: "isWantChange", value: false } })
            }
            if (error?.response?.data?.message) {
                alert(error?.response?.data?.message)
            }
        } finally {
            window.history.pushState(null, '', window.location.pathname)
            setLoading(false)
        }
    }

    return (
        <div className='d-flex w-full gap-3 flex-column' id='edit'>
            <div className='d-flex flex-column gap-4'>
                <Input
                    label='Title'
                    state={title}
                    setState={setTitle}
                    error={errorTitle}
                    setError={setErrorTitle}
                />
                <TextArea
                    label='Description'
                    state={description}
                    setState={setDescription}
                    setError={setErrorDescription}
                    error={errorDescription}
                />
            </div>
            <button disabled={loading} className='btn btn-outline-success' onClick={addTodoHandler}>
                Update
            </button>
        </div>
    )
}

export default memo(ChangeTodo)