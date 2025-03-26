import style from '@styles/admin/edit.module.scss';
import Dialog from "@components/Dialog/Dialog";
import AdminEditCategorySelectSearchBox from './SearchBox';
import AdminEditCategorySelectContent from './Content';
import { useState } from 'react';

export default function AdminEditCategorySelectDialog() {
    const [ show ] = useState(false);
    const handleTest = function() {
        console.log("Close!!!");
    }

    return <Dialog title="카테고리 선택" className={style.categorySelect} show={show} onClose={handleTest}>
        <AdminEditCategorySelectSearchBox />
        <AdminEditCategorySelectContent />
    </Dialog>
}