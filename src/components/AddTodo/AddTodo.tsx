import {
    useState,
    useContext
} from 'react'
import TextArea from '../../uiComponents/TextArea/TextArea'
import { context } from '../../context'
import { IContext, TodoAction, TodoDto2, TodoStates } from '../../interfaces/types'
import Input from '../../uiComponents/Input/Input'
import Todo from '../../services/todo'

const AddTodo = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [errorDescription, setErrorDescription] = useState('')
    const [errorTitle, setErrorTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const { dispatch } = useContext(context) as IContext<TodoStates, TodoAction>
    const addTodoHandler = async () => {
        if (!title || !description) {
            return
        }

        if (description.includes("<script>") && description.includes("</script>") || title.includes("<script>") && title.includes("</script>")) {
            return
        }



        const payload: TodoDto2 = {
            title,
            status: "in proccess",
            description: description.split('\n').map((item) => '<p>' + item + "</p>").join('')
        }

        try {
            setLoading(true)
            const data = await Todo.addTodo(payload)
            setDescription('')
            setTitle('')
            dispatch({ type: "ADD_ONE_TODO", payload: data.data })
            dispatch({ type: "CHANGE_ACTIVE", payload: { key: 'isWantAdd', value: false } })
        } catch (error: any) {
            console.log(error)
            if (error?.response?.data?.message) {
                alert(error?.response?.data?.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='d-flex w-full gap-3 flex-column' id='add'>
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
                Add
            </button>
        </div>
    )
}

export default AddTodo