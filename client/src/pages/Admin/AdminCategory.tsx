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
import { AdminCategoryContext } from '@components/Admin/Category/Context';

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

    const addCategory = function(parentId: number | null = null) {
        if (categoryList === null) return; // 아직 로딩 안됨

        const newCategory: CategoryOptionDTO = {
            count: 0,
            id: generateTempId(),
            parentId: parentId,
            local: true, // 아직 서버에 반영 안됨
            name: ""
        };

        setCategoryList([ ...categoryList, newCategory ]);
    }

    const handleAddCategory = () => addCategory();
    const handleAdd = (parent: number) => addCategory(parent);
    
    const handleChangeName = async function(id: number, newValue: string) {
        if (categoryList === null) return;

        // console.log("handleChangeName", id, newValue);
        const idx = categoryList.findIndex(v => v.id === id);
        const newObj = { ...categoryList[idx] };
        const newArr = [ ...categoryList ];

        newObj.name = newValue;
        newArr[idx] = newObj;

        setCategoryList(newArr);

        // 아마 이미 등록 하고 있는지 체크 넣어야 할듯
        const result = await request<number>("asset/category/admin", { method: "PUT", data: { name: newValue, parentId: newObj.parentId } });
        // 나중에 오류 처리

        setCategoryList(prev => {
            const idx = prev?.findIndex(v => v.id === id);

            if (!prev || !idx || idx < 0)
                return prev;

            const newArr = [ ...prev ];
            const newObj = { ...newArr[idx], local: false, id: result.data };
            
            newArr[idx] = newObj;
            return newArr;
        });
    }
    
    const handleRemove = function(id: number) {
        if (categoryList === null) return;
        
        const idx = categoryList.findIndex(v => v.id === id);
        const newArr = [ ...categoryList ];

        newArr.splice(idx, 1);

        setCategoryList(newArr);
    }

    useHandleAlive(onLoad, []);

    return <main className={style.screen}>
        <section className={baseStyle.head}>
            <h1>카테고리 관리</h1>
            <Button onClick={handleAddCategory}>추가</Button>
        </section>

        <AdminCategoryContext.Provider value={{ onChangeName: handleChangeName, onRemove: handleRemove, onAdd: handleAdd }}>
            {categoryList ? <AdminCategoryList list={categoryList} /> : <AdminCategoryLoading />}
        </AdminCategoryContext.Provider>
    </main>;
}