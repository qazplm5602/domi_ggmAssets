import style from '@styles/assetsList/side.module.scss';

type Props = {
    title: string
}

export default function AssetsListSideSelect({ title }: Props) {
    return <section className={style.select}>
        <h2>{title}</h2>
        
        <select>
            <option value="1">제목순</option>
            <option value="1">등록순</option>
        </select>
    </section>
}