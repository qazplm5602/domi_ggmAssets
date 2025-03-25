import style from '@styles/admin/edit.module.scss';
import Dialog from "@components/Dialog/Dialog";
import AdminEditCategorySelectSearchBox from './SearchBox';
import AdminEditCategorySelectContent from './Content';

export default function AdminEditCategorySelectDialog() {
    return <Dialog title="카테고리 선택" className={style.categorySelect} show={true}>
        <AdminEditCategorySelectSearchBox />
        <AdminEditCategorySelectContent />
    </Dialog>
}