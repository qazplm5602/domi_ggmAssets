import AssetsListSideBox from '@components/AssetsList/SideBox';
import AssetsListSideTagHead from './Head';
import AssetsListSideTagAddBtn from './AddBtn';
import AssetsListSideTagList from './List';
import { useState } from 'react';
import AssetsListSideTagListEdit from './ListEdit';

export default function AssetsListSideTagOption() {
    const [ edit, setEdit ] = useState(false);

    const handleEditMode = function() {
        setEdit(true);
    }
    const handleEditCancel = function() {
        setEdit(false);
    }

    return <AssetsListSideBox title={<AssetsListSideTagHead edit={edit} onEdit={handleEditMode} onCancel={handleEditCancel} />} footer={edit && <AssetsListSideTagAddBtn />}>
        {edit ? <AssetsListSideTagListEdit /> : <AssetsListSideTagList />}
    </AssetsListSideBox>;
}