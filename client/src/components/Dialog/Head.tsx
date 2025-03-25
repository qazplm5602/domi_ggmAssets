import IconButton from "@components/Buttons/IconButton";
import closeIcon from '@assets/icons/close.svg';
import style from '@styles/dialog/style.module.scss';

export default function DialogHead() {
    return <section className={style.head}>
        <h2>키테고리 선택</h2>
        <IconButton icon={closeIcon} className={style.close} />
    </section>;
}