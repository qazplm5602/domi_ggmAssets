import style from '@styles/admin/edit.module.scss';
import AdminEditCategorySelectItem from './Item';
import { CategoryVO } from '@domiTypes/category';
import { categoryDataIndex } from '@utils/category';

type Props = {
    categories: CategoryVO[]
}

export default function AdminEditCategorySelectContent({ categories }: Props) {
    const categoryDict = categoryDataIndex(categories);

    return <section className={style.list}>
        {Array.from(categoryDict.children[-1]).map(id => <AdminEditCategorySelectItem key={categoryDict.dict[id].id} id={id} table={categoryDict} />)}
    </section>;
}