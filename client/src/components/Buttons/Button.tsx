import React from "react"
import style from '@styles/buttons/style.module.scss';

type Props = {
    children: React.ReactNode,
    className?: string
}

export default function Button({ children, className }: Props) {
    return <button className={`${style.base} ${className || ''}`}>{children}</button>
}