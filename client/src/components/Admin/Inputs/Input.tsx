import style from '@styles/inputs/style.module.scss';

export default function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return <input className={`${style.main} ${className || ''}`} type="text" {...props} />
}