import SkeletonLoadBox from '@components/SkeletonLoader/SkeletonLoader';
import style from '@styles/admin/edit.module.scss';

export default function CategoryFieldTagsLoading() {
    return <section className={`${style.tags} ${style.loading}`}>
        <SkeletonLoadBox className={style.box} /> / <SkeletonLoadBox className={style.box} delay={100} />  / <SkeletonLoadBox className={style.box} delay={200} />
    </section>;
}