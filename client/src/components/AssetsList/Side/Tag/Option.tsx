import AssetsListSideBox from '@components/AssetsList/SideBox';
import AssetsListSideTagHead from './Head';
import AssetsListSideTagAddBtn from './AddBtn';
import AssetsListSideTagList from './List';
import { useContext, useState } from 'react';
import AssetsListSideTagListEdit from './ListEdit';
import { favoriteTagContext } from '@components/Favorite/Tag/Context';

export default function AssetsListSideTagOption() {
    const [ edit, setEdit ] = useState(false);
    const { addCallRef, saveCallRef } = useContext(favoriteTagContext);

    const handleEditMode = function() {
        setEdit(true);
    }
    const handleEditCancel = function() {
        setEdit(false);
    }

    const handleEditSave = async function() {
        const cb = saveCallRef?.current;

        // 여기에서 잠금
        
        if (cb)
            await cb();
        
        
        // 잠금 끝
        // 그리고 닫기
        handleEditCancel();
    }
    const handleAddItem = function() {
        const cb = addCallRef?.current;

        if (cb)
            cb();
    }

    return <AssetsListSideBox title={<AssetsListSideTagHead edit={edit} onEdit={handleEditMode} onCancel={handleEditCancel} onSave={handleEditSave} />} footer={edit && <AssetsListSideTagAddBtn onClick={handleAddItem} />}>
        {edit ? <AssetsListSideTagListEdit /> : <AssetsListSideTagList />}
    </AssetsListSideBox>;
}