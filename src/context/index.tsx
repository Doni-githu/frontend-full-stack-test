import { useReducer, createContext } from "react";
import { AppProviderProps, ITodo, TodoAction, TodoStates } from "../interfaces/types";



const initialState: TodoStates = {
    todos: [],
    filter: 'all',
    isWantChange: false,
    isWantAdd: false,
}

export const context = createContext({})

function reducer(state: TodoStates, action: TodoAction): TodoStates {
    switch (action.type) {
        case "ADD_ONE_TODO":
            return { ...state, todos: [...state.todos, action.payload] }
        case "CHANGE_FILTER":
            return { ...state, filter: action.payload }
        case "CLEAR_COMPLETED":
            const completed = state.todos.filter(item => item.status === "completed")
            return { ...state, todos: completed }
        case "CHANGE_TODO":
            const todosChanged = state.todos.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload
                }
                return item
            })
            return { ...state, todos: todosChanged }
        case "CHANGE_STATUS":
            const newTodos2: ITodo[] = state.todos.map((item) => {
                if (item.id === parseInt(action.payload.id)) {
                    console.log(item)
                    return {
                        ...item,
                        status: action.payload.status
                    }
                }
                return item
            })
            return { ...state, todos: newTodos2 }
        case "DELETE_TODO":
            const newTodos = state.todos.filter((c) => c.id != action.payload)
            return { ...state, todos: newTodos }
        case "CHANGE_ACTIVE":
            return { ...state, [action.payload.key]: action.payload.value }

    }
}


function AppProvider({ children }: AppProviderProps) {
    const [state, dispatch] = useReducer(reducer, initialState)


    return (
        <context.Provider value={{ state, dispatch }}>
            {children}
        </context.Provider>
    )
}

export default AppProvider