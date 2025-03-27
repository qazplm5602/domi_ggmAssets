import style from '@styles/popup/style.module.scss';
import { usePopupStore } from './store';
import Button from '@components/Buttons/Button';

export default function PopupBox() {
    const { show, title, content, interaction } = usePopupStore();
    
    return <div className={style.box}>
        <h1>{title}</h1>
        <section className={style.content}>
            {content}
        </section>
        
        <section className={style.interaction}>
            <Button>잉</Button>
        </section>
    </div>;
}