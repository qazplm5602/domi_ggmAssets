import CheckBoxContainer from '@components/CheckBox/Container';
import { AutoFieldCheckState } from '@domiTypes/assetAutoField';
import style from '@styles/admin/edit.module.scss';

type CheckNameType = [keyof AutoFieldCheckState, string];
type CheckRowsItemType = { [key: number]: CheckNameType[] };
const ROW_AMOUNT = 3;

const checkNames: CheckNameType[] = [
    [ 'title', '제목' ],
    [ 'description', '설명' ],
    [ 'shortDesc', '간단한 설명' ],
    [ 'category', '카테고리' ],
    [ 'platform', '플랫폼' ],
    [ 'publishAt', '등록일' ],
    [ 'fileSize', '파일 크기' ],
    [ 'supports', '호환성' ],
    [ 'thumbnail', '썸네일' ]
];

const indexingRow: CheckRowsItemType = {    
};

checkNames.forEach((v, i) => {
    const idx = i % ROW_AMOUNT;

    if (!indexingRow[idx])
        indexingRow[idx] = [];

    indexingRow[idx].push(v);
});


export default function AdminEditAutoFieldDialogOptionRow() {
    return <section className={style.row}>
        {Object.values(indexingRow).map(v => <article>
            {v.map(field => <CheckBoxContainer id={`autoField-${field[0]}`} name={field[1]} className={style.checkbox} />)}
        </article>)}
    </section>;
}