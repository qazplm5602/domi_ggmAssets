import SkeletonLoadBox from '@components/SkeletonLoader/SkeletonLoader';
import style from '@styles/assetsList/style.module.scss';

type Props = {
    current: number
}

export default function PrePagination({ current }: Props) {
    return <section className={style.pagination}>
        <button className={style.active}>{current}</button>
        <SkeletonLoadBox className={style.pre} delay={100} />
        <SkeletonLoadBox className={style.pre} delay={200} />
        <SkeletonLoadBox className={style.pre} delay={300} />
        <SkeletonLoadBox className={style.pre} delay={400} />
    </section>;
}