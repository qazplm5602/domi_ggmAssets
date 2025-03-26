import React from "react"
import style from '@styles/buttons/style.module.scss';

type Props = {
    children: React.ReactNode,
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button({ children, className, onClick }: Props) {
    return <button className={`${style.base} ${className || ''}`} onClick={onClick}>{children}</button>
}