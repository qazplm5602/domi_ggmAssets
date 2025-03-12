import style from '@styles/buttons/style.module.scss';

type Props = {
    className?: string,
    icon: string,
    size?: number
}

export default function IconButton({ className, icon, size }: Props) {
    return <button className={`${style.onlyIco} ${className ? className : ''}`}>
        <img src={icon} alt="button icon" style={{ width: size, height: size }} />
    </button>
}