import { memo, useContext } from 'react'
import Item from '../Item/Item'
import { context } from '../../context'
import { IContext, TodoAction, TodoStates } from '../../interfaces/types'
import { filterTodoHandler } from '../../utils'

const List = () => {
    const { state } = useContext(context) as IContext<TodoStates, TodoAction>
    return (
        <div className='list-group' id='list'>
            {filterTodoHandler(state.todos, state.filter).map((item, idx) => {
                return <Item key={idx} todo={item} />
            })}
        </div>
    )
}

export default memo(List)