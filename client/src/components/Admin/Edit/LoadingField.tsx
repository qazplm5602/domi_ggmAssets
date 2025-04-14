import SkeletonLoadBox from '@components/SkeletonLoader/SkeletonLoader';
import style from '@styles/admin/edit.module.scss';

type Props = {
    index?: number
}

export default function AdminAssetEditLoadingField({ index = 0 }: Props) {
    return <article className={style.field}>
        <SkeletonLoadBox className={style.title} delay={index * 100} />
        <SkeletonLoadBox className={style.sub} delay={index * 200} />
        <SkeletonLoadBox className={style.input} delay={index * 300} />
    </article>
}