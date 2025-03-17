import SkeletonLoadBox from '@components/SkeletonLoader/SkeletonLoader';
import style from '@styles/assetDetail/style.module.scss';

export default function AssetDetailLoading() {
    return <main>
        <section className={`${style.main} ${style.loading}`}>
            {/* 헤더 */}
            <article className={style.head}>
                <SkeletonLoadBox className={style.title} />
                <SkeletonLoadBox className={style.sub} delay={100} />
            </article>

            {/* 프리뷰 */}
            <article className={style.preview_main}>
                <div className={style.gallery}>
                    <SkeletonLoadBox className={style.viewer} delay={200} />

                    <section className={style.list}>
                        <SkeletonLoadBox className={style.box} delay={300} />
                        <SkeletonLoadBox className={style.box} delay={400} />
                    </section>
                </div>
                <SkeletonLoadBox className={style.info} delay={500} />
            </article>
            
        </section>
    </main>;
}