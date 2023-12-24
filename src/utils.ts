import { Dispatch, SetStateAction } from "react"
import { ITodo, TodoType } from "./interfaces/types"

const filterTodoHandler = (data: ITodo[], filter: TodoType) => {
    if (filter !== "all") {
        return data.filter((c) => c.status === filter)
    }

    return data
}

interface InputChangeHandler {
    value: string,
    setError: Dispatch<SetStateAction<string>>,
    setState: Dispatch<SetStateAction<string>>,
    label: string;
}

const inputChangeHandler = ({ setError, setState, value, label }: InputChangeHandler) => {
    setState(value)
    if (!value) {
        setError(label + " must have field")
    }
    else {
        setError('')
    }

}

export {
    filterTodoHandler,
    inputChangeHandler
}