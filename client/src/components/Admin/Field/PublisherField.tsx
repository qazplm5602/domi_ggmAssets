import style from '@styles/admin/edit.module.scss';
import AdminField from './Field';
import Input from '../Inputs/Input';

type Props = {
    className?: string
}

export default function AdminEditPublisherField({ className }: Props) {
    return <AdminField title='배급사' className={className}>
        <section className={style.verticalField}>
            <h4>플랫폼</h4>
            <select>
                <option value="">없음</option>
                <option value="">UnityAssetStore</option>
                <option value="">Itch.io</option>
            </select>
        </section>
        
        <section className={style.verticalField}>
            <h4>제작자</h4>
            <Input placeholder='제작자를 입력하세요.' />
        </section>
    </AdminField>;
}