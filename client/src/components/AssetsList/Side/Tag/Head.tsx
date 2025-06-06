import style from '@styles/assetsList/side.module.scss';

type Props = {
    edit: boolean
}

export default function AssetsListSideTagHead({ edit }: Props) {
    return <section className={style.tagHead}>
        <h1>태그</h1>

        <article className={style.interaction}>
            {/* 편집 아닐때 */}
            {!edit && <button>편집</button>}

            {/* 편집중임임 */}
            {edit && <button className={style.save}>저장</button>}
            {edit && <button className={style.cancel}>취소</button>}
        </article>
    </section>;
}