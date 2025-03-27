import React from "react"
import style from '@styles/buttons/style.module.scss';

type Props = {
    children: React.ReactNode,
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button({ children, className, onClick, ...props }: Props & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button className={`${style.base} ${className || ''}`} onClick={onClick} {...props}>{children}</button>
}