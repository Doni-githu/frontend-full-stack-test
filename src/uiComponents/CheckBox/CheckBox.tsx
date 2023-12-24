import './CheckBox.scss'
import { ITodo } from '../../interfaces/types'
export interface ICheckBoxProps {
    todo: ITodo,
}
const Checkbox = ({ todo }: ICheckBoxProps) => {
    return (
        <label>
            <input type="checkbox" className={`hid ${todo.status === "completed" ? 't' : ''}`}  />
            <span className="fake"></span>
        </label>
    )
}

export default Checkbox