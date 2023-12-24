import { inputChangeHandler } from "../../utils"
import ITextAreaProps from "../TextArea/TextAreaProps"


const Input = ({ label, setState, state, error, setError }: ITextAreaProps) => {
    return (
        <div className="form-floating w-full">
            <input
                className={`form-control ${error && 'is-invalid'}`}
                value={state}
                placeholder={label}
                id={`floatinginput ${label}`}
                onChange={(e) => inputChangeHandler({ value: e.target.value, label, setError, setState })}
            ></input>
            <label htmlFor={`floatinginput ${label}`} style={{ width: '100%' }}>{error ? error : label}</label>

        </div>
    )
}

export default Input