import Button from "@components/Buttons/Button";
import AdminField from "../Field";
import AdminEditCompatibilityItem from "./Item";
import style from '@styles/admin/edit.module.scss';

type Props = {
    className?: string
}

export default function AdminEditCompatibilityField({ className }: Props) {
    return <AdminField title="호환성" className={className}>
        {/* 리스트 */}
        <section className={style.supportList}>
            <AdminEditCompatibilityItem />
            <AdminEditCompatibilityItem />
            <AdminEditCompatibilityItem />
            <AdminEditCompatibilityItem />
        </section>

        <Button>추가</Button>
    </AdminField>
}