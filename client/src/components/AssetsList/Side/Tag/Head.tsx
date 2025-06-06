import style from '@styles/assetsList/side.module.scss';

export default function AssetsListSideTagHead() {
    return <section className={style.tagHead}>
        <h1>태그</h1>
        <button className={style.edit}>편집</button>
    </section>;
}