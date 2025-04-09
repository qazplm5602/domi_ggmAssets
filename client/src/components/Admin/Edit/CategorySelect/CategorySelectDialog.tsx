import style from '@styles/admin/edit.module.scss';
import Dialog from "@components/Dialog/Dialog";
import AdminEditCategorySelectSearchBox from './SearchBox';
import AdminEditCategorySelectContent from './Content';

import { useEffect, useRef, useState } from 'react';
import { CategoryVO } from '@domiTypes/category';
import { request } from '@utils/request';

type Props = {
    show: boolean,
    onClose?: () => void
}

export default function AdminEditCategorySelectDialog({ show, onClose }: Props) {
    const [ categories, setCategories ] = useState<CategoryVO[] | null>(null);
    const loadRef = useRef(false); // true면 데이터 요청 한거잉

    const handleTest = function() {
        if (onClose)
            onClose();
    }

    const loadCategory = async function() {
        loadRef.current = true;

        const response = await request<CategoryVO[]>("asset/category");
        setCategories(response.data);
    }

    useEffect(() => {
        if (!loadRef.current && show)
            loadCategory();
    }, [ show ]);

    return <Dialog title="카테고리 선택" className={style.categorySelect} show={show} onClose={handleTest}>
        <AdminEditCategorySelectSearchBox />
        {categories && <AdminEditCategorySelectContent categories={categories} />}
    </Dialog>
}