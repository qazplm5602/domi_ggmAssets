import AssetsListSideBox from '@components/AssetsList/SideBox';
import AssetsListSideTagHead from './Head';
import AssetsListSideTagAddBtn from './AddBtn';
import AssetsListSideTagList from './List';
import { useState } from 'react';
import AssetsListSideTagListEdit from './ListEdit';

export default function AssetsListSideTagOption() {
    const [ edit, setEdit ] = useState(true);

    return <AssetsListSideBox title={<AssetsListSideTagHead edit={edit} />} footer={edit && <AssetsListSideTagAddBtn />}>
        {edit ? <AssetsListSideTagListEdit /> : <AssetsListSideTagList />}
    </AssetsListSideBox>;
}