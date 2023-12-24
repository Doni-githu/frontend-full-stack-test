import { inputChangeHandler } from '../../utils'
import ITextAreaProps from './TextAreaProps'

const TextArea = ({ label, setState, state, error, setError }: ITextAreaProps) => {
    return (
        <div className="form-floating w-full">
            <textarea
                className={`form-control ${error && 'is-invalid'}`}
                value={state}
                placeholder={label}
                id={`floatingTextarea ${label}`}
                style={{height: '250px'}}
                onChange={(e) => {
                    inputChangeHandler({ value: e.target.value, label, setError, setState })
                    if (e.target.value.length < 10) {
                        setError(label + 'must be more 10')
                    }
                }}
            ></textarea>
            <label htmlFor={`floatingTextarea ${label}`} style={{ width: '100%' }}>{error ? error : label}</label>
        </div>
    )
}

export default TextArea