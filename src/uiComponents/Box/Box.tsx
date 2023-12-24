import { ReactNode } from 'react'
import './Box.scss'
interface IBoxProps {
    children: ReactNode
}

const Box = ({ children }: IBoxProps) => {
    return (
        <div className='box'>
            {children}
        </div>
    )
}

export default Box