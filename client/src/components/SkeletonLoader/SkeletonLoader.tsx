import style from '@styles/SkeletonLoader/style.module.scss';

type Props = {
    className?: string,
    delay?: number
}

export default function SkeletonLoadBox({ className, delay }: Props) {
    return <div className={`${style.box} ${className || ''}`} style={{ animationDelay: `${delay || 0}ms` }}></div>;
}