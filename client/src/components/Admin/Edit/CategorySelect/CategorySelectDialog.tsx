import style from '@styles/admin/edit.module.scss';
import Dialog from "@components/Dialog/Dialog";
import AdminEditCategorySelectSearchBox from './SearchBox';
import AdminEditCategorySelectContent from './Content';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CategoryVO } from '@domiTypes/category';
import { request } from '@utils/request';
import { AdminEditCategorySelectContext } from './SearchState';
import { adminEditCategorySelectSearchFilter } from '../util/categorySearch';

type Props = {
    show: boolean,
    onClose?: () => void,
    onSelect?: (id: number) => void
}

export default function AdminEditCategorySelectDialog({ show, onClose, onSelect }: Props) {
    const [ categories, setCategories ] = useState<CategoryVO[] | null>(null);
    const [ searchVal, setSearchVal ] = useState("");
    const loadRef = useRef(false); // true면 데이터 요청 한거잉

    // 검색입력값으로 필터링
    const filterCategories = useMemo(() => categories ? adminEditCategorySelectSearchFilter(searchVal, categories) : null, [ searchVal, categories ]);

    const handleTest = function() {
        if (onClose)
            onClose();
    }

    const loadCategory = async function() {
        loadRef.current = true;

        const response = await request<CategoryVO[]>("asset/category");
        setCategories(response.data);
    }

    const handleCategorySelect = function(categoryId: number) {
        if (onSelect)
            onSelect(categoryId);
        
        if (onClose)
            onClose();
    }

    useEffect(() => {
        if (!loadRef.current && show)
            loadCategory();
    }, [ show ]);

    return <Dialog title="카테고리 선택" className={style.categorySelect} show={show} onClose={handleTest}>
        <AdminEditCategorySelectContext.Provider value={{ searchValue: searchVal, onSelect: handleCategorySelect }}>
            <AdminEditCategorySelectSearchBox value={[ searchVal, setSearchVal ]} />
            {filterCategories && <AdminEditCategorySelectContent categories={filterCategories} />}
        </AdminEditCategorySelectContext.Provider>
    </Dialog>
}