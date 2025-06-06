import AssetsListSideBox from '@components/AssetsList/SideBox';
import AssetsListSideTagHead from './Head';
import AssetsListSideTagAddBtn from './AddBtn';
import AssetsListSideTagList from './List';

export default function AssetsListSideTagOption() {
    return <AssetsListSideBox title={<AssetsListSideTagHead />} footer={<AssetsListSideTagAddBtn />}>
        <AssetsListSideTagList />
    </AssetsListSideBox>;
}