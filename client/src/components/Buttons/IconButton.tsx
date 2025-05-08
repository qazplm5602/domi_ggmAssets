import style from '@styles/buttons/style.module.scss';

type Props = {
    className?: string,
    icon: string,
    size?: number,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    children?: React.ReactNode
}

export default function IconButton({ className, icon, size, onClick, children }: Props) {
    return <button className={`${style.onlyIco} ${className ? className : ''}`} onClick={onClick}>
        <img src={icon} alt="button icon" style={{ width: size, height: size }} />
        {children}
    </button>
}