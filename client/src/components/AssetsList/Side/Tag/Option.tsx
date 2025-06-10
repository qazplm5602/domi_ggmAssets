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

    const handleEditSave = function() {
        const cb = saveCallRef?.current;

        if (cb)
            cb();
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