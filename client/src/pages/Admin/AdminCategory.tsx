import baseStyle from '@styles/admin/edit.module.scss';
import style from '@styles/admin/category.module.scss';
import Button from '@components/Buttons/Button';
import AdminCategoryList from '@components/Admin/Category/List';
import { useMemo, useState } from 'react';
import { CategoryCountVO, CategoryOptionDTO } from '@domiTypes/category';
import AdminCategoryLoading from '@components/Admin/Category/Loading';
import { useHandleAlive } from '@utils/requestEventHook';
import { AliveType } from '@domiTypes/alive';
import { request } from '@utils/request';
import { generateRandomNumber } from '@utils/misc';

export default function AdminCategory() {
    const [ categoryList, setCategoryList ] = useState<CategoryOptionDTO[] | null>(null);
    const categoryIds = useMemo(() => {
        const set = new Set();
        if (categoryList)
            categoryList.forEach(i => set.add(i));
        
        return set;
    }, [ categoryList ]);

    const generateTempId = function(amount?: number) {
        if (amount && amount > 100)
            throw new Error("임시 id 생성 실패.");

        const id = generateRandomNumber(1000000, 9999999);
        
        if (categoryIds.has(id))
            return generateTempId((amount || 0) + 1);

        return id;
    }

    const onLoad = async function(aliveRef: AliveType) {
        const result = await request<CategoryCountVO[]>("asset/category/admin");
        if (!aliveRef.alive) return;
        
        // 변환 ㅁㄴㅇㄹ
        const data: CategoryOptionDTO[] = result.data.map(v => ({ ...v, local: false }));
        setCategoryList(data);
    }

    const handleAddCategory = function() {
        if (categoryList === null) return; // 아직 로딩 안됨

        const newCategory: CategoryOptionDTO = {
            count: 0,
            id: generateTempId(),
            parentId: null,
            local: true, // 아직 서버에 반영 안됨
            name: ""
        };

        setCategoryList([ ...categoryList, newCategory ]);
    }

    useHandleAlive(onLoad, []);

    return <main className={style.screen}>
        <section className={baseStyle.head}>
            <h1>카테고리 관리</h1>
            <Button onClick={handleAddCategory}>추가</Button>
        </section>

        {categoryList ? <AdminCategoryList list={categoryList} /> : <AdminCategoryLoading />}
    </main>;
}