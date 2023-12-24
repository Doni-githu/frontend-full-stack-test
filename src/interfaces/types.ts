import { Dispatch, ReactNode } from "react";

export type TodoType = 'completed' | 'pending' | 'in proccess' | 'all'
export interface ITodo {
    title: string,
    status: 'completed' | 'pending' | 'in proccess',
    id: number,
    description: string;
}


export interface TodoStates {
    todos: ITodo[],
    filter: TodoType,
    isWantChange: boolean,
    isWantAdd: boolean,
}

export interface TodoDto2 extends Omit<ITodo, "id"> {}

export interface TodoDto extends Omit<ITodo, "id" | "status"> { }



export type Types = "ADD_ONE_TODO" |
    "CHANGE_STATUS" |
    "CHANGE_FILTER" |
    "CLEAR_COMPLETED" |
    "DELETE_TODO" |
    "CHANGE_TODO" |
    "CHANGE_ACTIVE"


export interface TodoAction {
    type: Types,
    payload?: any
}


export interface AppProviderProps {
    children: ReactNode
}

export interface IContext<T, G> {
    state: T,
    dispatch: Dispatch<G>
}