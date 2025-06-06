import IconButton from "@components/Buttons/IconButton";
import closeIcon from '@assets/icons/close.svg';
import style from '@styles/dialog/style.module.scss';

type Props = {
    title: string,
    onClose?: () => void
}

export default function DialogHead({ title, onClose }: Props) {
    return <section className={style.head}>
        <h2>{title}</h2>
        <IconButton icon={closeIcon} className={style.close} onClick={onClose} />
    </section>;
}