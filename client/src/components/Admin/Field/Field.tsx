import style from '@styles/admin/style.module.scss';
import AdminFieldHead from "./Head";

type Props = {
    children?: React.ReactNode,
    className?: string
}

export default function AdminField({ children, className, ...props }: Props & Parameters<typeof AdminFieldHead>['0']) {
    return <article className={`${style.field} ${className || ''}`}>
        <AdminFieldHead {...props} />
        {children}
    </article>;
}