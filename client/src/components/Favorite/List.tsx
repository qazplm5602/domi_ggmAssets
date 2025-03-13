import originStyle from '@styles/assetsList/style.module.scss';
import ItemSelectable from './ItemSelectable';

export default function FavoriteSelectList() {
    return <section className={originStyle.itemContainer}>
        <ItemSelectable />
        <ItemSelectable select={true} />
        <ItemSelectable />
        <ItemSelectable />
    </section>
}