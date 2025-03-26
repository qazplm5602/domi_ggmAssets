import baseStyle from '@styles/admin/edit.module.scss';
import style from '@styles/admin/category.module.scss';
import Button from '@components/Buttons/Button';
import AdminCategoryList from '@components/Admin/Category/List';
import { useState } from 'react';
import { CategoryCountVO } from '@domiTypes/category';
import AdminCategoryLoading from '@components/Admin/Category/Loading';
import { useHandleAlive } from '@utils/requestEventHook';
import { AliveType } from '@domiTypes/alive';
import { request } from '@utils/request';

export default function AdminCategory() {
    const [ categoryList, setCategoryList ] = useState<CategoryCountVO[] | null>(null);

    const onLoad = async function(aliveRef: AliveType) {
        const result = await request<CategoryCountVO[]>("asset/category/admin");
        if (!aliveRef.alive) return;
        
        setCategoryList(result.data);
    }

    useHandleAlive(onLoad, []);

    return <main className={style.screen}>
        <section className={baseStyle.head}>
            <h1>카테고리 관리</h1>
            <Button>추가</Button>
        </section>

        {categoryList ? <AdminCategoryList list={categoryList} /> : <AdminCategoryLoading />}
    </main>;
}