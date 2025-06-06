import SkeletonLoadBox from '@components/SkeletonLoader/SkeletonLoader';
import style from '@styles/assetsList/style.module.scss';

type Props = {
    delay?: number,
    className?: string
}

export default function AssetItemLoading({ delay, className }: Props) {
    return <a>
        <div className={`${style.item} ${style.loading} ${className || ''}`}>
            <SkeletonLoadBox className={style.gallery} delay={delay} />

            <section className={style.detail}>
                <SkeletonLoadBox className={style.owner} delay={delay} />
                <SkeletonLoadBox className={style.title} delay={delay} />
                <SkeletonLoadBox className={style.title} delay={delay} />
            </section>

            <section className={style.info}>
                <SkeletonLoadBox className={style.category} delay={delay} />
                <SkeletonLoadBox className={style.logo} delay={delay} />
            </section>
        </div>
    </a>;
}