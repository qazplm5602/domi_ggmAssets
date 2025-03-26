import SkeletonLoadBox from '@components/SkeletonLoader/SkeletonLoader';
import style from '@styles/admin/category.module.scss';

export default function AdminCategoryLoading() {
    return <section className={`${style.list} ${style.loading}`}>
        <SkeletonLoadBox className={style.item} />
        <SkeletonLoadBox className={style.item} delay={100} />
        <SkeletonLoadBox className={style.item} delay={200} />
        <SkeletonLoadBox className={style.item} delay={300} />
        <SkeletonLoadBox className={style.item} delay={400} />
    </section>
}