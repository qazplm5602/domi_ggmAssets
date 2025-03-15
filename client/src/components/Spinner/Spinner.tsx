import style from '@styles/spinner/style.module.scss';

type Props = {
    className?: string
}

export default function Spinner({ className }: Props) {
    return <span className={`${style.loader} ${className || ''}`}></span>
}