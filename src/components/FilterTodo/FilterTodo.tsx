import { useContext } from 'react'
import { context } from '../../context'
import { IContext, TodoAction, TodoStates } from '../../interfaces/types'
import './FilterTodo.scss'


const FilterTodo = () => {
  const { dispatch, state } = useContext(context) as IContext<TodoStates, TodoAction>
  const handleAddClick = () => {
    if (state.isWantAdd) {
      dispatch({ type: 'CHANGE_ACTIVE', payload: { key: 'isWantAdd', value: false } })
    } else {
      dispatch({ type: 'CHANGE_ACTIVE', payload: { key: 'isWantAdd', value: true } })
      const element = window.document.getElementById('list')
      if (element) {
        window.scrollTo({ behavior: "smooth", top: window.screenTop })
      }
    }
  }
  return (
    <div className='d-flex justify-content-between'>
      <div className='center'>
      </div>
      <div className='btn-group'>
      </div>
      <div className='center'>
        <button className='btn btn-success' onClick={handleAddClick}>{state.isWantAdd && 'Not'} Create Todo</button>
      </div>
    </div>
  )
}

export default FilterTodo