import baseStyle from '@styles/admin/style.module.scss';
import style from '@styles/admin/edit.module.scss';
import SkeletonLoadBox from '@components/SkeletonLoader/SkeletonLoader';
import AdminAssetEditLoadingField from './LoadingField';

export default function AdminAssetEditLoading() {
    return <main className={`${baseStyle.screen} ${style.screen} ${style.loading}`}>
        <section className={style.content}>
            <article className={style.head}>
                <h1>에셋 수정</h1>

                <section className={style.interaction}>
                    <SkeletonLoadBox className={style.save} />
                </section>
            </article>

            <AdminAssetEditLoadingField index={1} />
            <AdminAssetEditLoadingField index={2} />
            <AdminAssetEditLoadingField index={3} />
        </section>

        <aside className={style.side}>
            <SkeletonLoadBox className={style.item} />
        </aside>
    </main>
}