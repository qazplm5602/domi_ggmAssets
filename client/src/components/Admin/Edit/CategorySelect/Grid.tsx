import style from '@styles/admin/edit.module.scss';

type Props = {
    mode: 'line' | 'end' | 'center'
}

export default function AdminEditCategorySelectItemGrid({ mode }: Props) {
    return <div className={style.grid}>
        <div className={`${style.horizontal} ${mode === 'end' ? style.half : ''}`}></div>
        {mode !== 'line' && <div className={style.vertical}></div>}
    </div>;
}