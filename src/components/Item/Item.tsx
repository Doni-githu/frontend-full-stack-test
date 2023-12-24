import './Item.scss'
import { IItemProps } from "./Item.props"
import { useContext, useState } from 'react'
import { context } from '../../context'
import { IContext, TodoAction, TodoStates } from '../../interfaces/types'
import Todo from '../../services/todo'

const Item = ({ todo }: IItemProps) => {
    const { dispatch } = useContext(context) as IContext<TodoStates, TodoAction>
    const [deleting, setDeleting] = useState(false)
    const handleUpdateClick = () => {
        const urlParams = new URLSearchParams(window.location.search);

        urlParams.set('id', todo.id.toString());
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.pushState(null, '', newUrl)
        const element = window.document.getElementById('edit')
        window.scrollTo({ behavior: "smooth", top: element?.offsetTop })
        dispatch({ type: 'CHANGE_ACTIVE', payload: { key: 'isWantChange', value: true } })
    }


    const handleDeleteClick = async () => {
        try {
            setDeleting(true)
            await Todo.deleteTodo(todo.id)
            dispatch({ type: "DELETE_TODO", payload: todo.id })
        } catch (error) {
            console.log(error)
        }finally{
            setDeleting(false)
        }
    }

    return (
        <div className={`list-group-item d-flex flex-column gap-2`}>
            <div className='d-flex w-full' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className={todo.status === "completed" ? "text-decoration-line-through" : ''}>{todo.title}</h2>
                <div>
                    <select className='form-select' onChange={(e) => {
                        dispatch({ type: "CHANGE_STATUS", payload: { id: todo.id, status: e.target.value } })
                    }}>
                        <option value="in proccess">In proccess</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
            </div>
            <div className="body">
                <div dangerouslySetInnerHTML={{ __html: todo.description }}></div>
            </div>
            <div className='btn-group'>
                <button className='btn btn-success' onClick={handleUpdateClick}>Update</button>
                <button className='btn btn-danger' disabled={deleting} onClick={handleDeleteClick}>Delete</button>
            </div>
        </div>
    )
}

export default Item