import Button from "@components/Buttons/Button";
import AdminField from "../Field";
import AdminEditCompatibilityItem from "./Item";
import style from '@styles/admin/edit.module.scss';
import { ReactState } from "@domiTypes/react";
import { CompatibilityVO } from "@domiTypes/asset";

type Props = {
    className?: string,
    state: ReactState<CompatibilityVO[]>
}

export default function AdminEditCompatibilityField({ className, state: [ supports, setSupports ] }: Props) {
    const handleItemChange = function(idx: number, changeVal: Partial<CompatibilityVO>) {
        const newItem = { ...supports[idx], ...changeVal };
        const newList = [ ...supports ];
        newList[idx] = newItem;
        
        setSupports(newList);
    }

    return <AdminField title="호환성" className={className}>
        {/* 리스트 */}
        <section className={style.supportList}>
            {supports.map((v, i) => <AdminEditCompatibilityItem key={i} data={v} onChange={value => handleItemChange(i, value)} />)}
        </section>

        <Button>추가</Button>
    </AdminField>
}