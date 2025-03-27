import PopupBox from "./Box";
import { usePopupStore } from "./store"
import style from '@styles/popup/style.module.scss';

export default function Popup() {
    const { show } = usePopupStore();
    
    return <div className={style.bg}>
        <PopupBox />
    </div>;
}