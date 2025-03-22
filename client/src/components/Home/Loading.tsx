import SkeletonLoadBox from '@components/SkeletonLoader/SkeletonLoader';
import style from '@styles/home/style.module.scss';

export default function HomeLoading() {
    return <section className={style.assets}>
        <SkeletonLoadBox className={style.base_box} />
        <SkeletonLoadBox className={style.base_box} delay={100} />
        <SkeletonLoadBox className={style.base_box} delay={200} />
    </section>;
}