import AdminEditContent from '@components/Admin/Edit/Content';
import AdminEditSide from '@components/Admin/Edit/Side';
import baseStyle from '@styles/admin/style.module.scss';
import style from '@styles/admin/edit.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { AssetEditFieldStates, ThumbnailLocalVO } from '@domiTypes/assetEdit';
import { AssetAllVO, AssetBaseVO, CompatibilityVO } from '@domiTypes/asset';
import { hasAssetEditFieldUpdated } from '@components/Admin/Edit/util/diffField';
import { useParams } from 'react-router-dom';
import { adminAssetEditLoad } from '@components/Admin/Edit/util/loadAsset';
import AdminAssetEditSaveLoading from '@components/Admin/Edit/SaveLoading';
import { saveAdminEditAsset } from '@components/Admin/Edit/util/save';
import AdminAssetEditLoading from '@components/Admin/Edit/Loading';
import MetaTag from '@components/MetaTag/MetaTag';
import AdminEditAutoFieldDialog from '@components/Admin/Edit/AutoField/Dialog';

export default function AdminAssetEdit() {
    const titleState = useState("");
    const fileLinkState = useState("");
    const storeLinkState = useState("");
    const versionState = useState("");
    const createAtState = useState("");
    const shortDescState = useState("");
    const descriptionState = useState("");
    const artistState = useState("");
    const platformState = useState<AssetBaseVO['platform']>(null);
    const supportsState = useState<CompatibilityVO[]>([]);
    const categoryState = useState<number | null>(null);
    const imagesState = useState<ThumbnailLocalVO[]>([]);
    const sizeState = useState("");
    const fileVersion = useState("");
    const storeVersion = useState("");

    const fieldStates: AssetEditFieldStates = {
        title: titleState,
        fileLink: fileLinkState,
        storeLink: storeLinkState,
        version: versionState,
        createAt: createAtState,
        shortDesc: shortDescState,
        description: descriptionState,
        artist: artistState,
        platform: platformState,
        supports: supportsState,
        category: categoryState,
        images: imagesState,
        fileSize: sizeState,
        fileVersion,
        storeVersion
    };

    ////// 원본 에셋
    const [ originAsset, setOriginAsset ] = useState<AssetAllVO | null>(null);
    const { id: assetId } = useParams();

    const isDifferent = useMemo(() => originAsset !== null && hasAssetEditFieldUpdated(fieldStates, originAsset), [ originAsset, ...Object.values(fieldStates).map(v => v[0]) ]);

    const [ saving, setSaving ] = useState(false);

    const [ autoFieldPopup, setAutoFieldPopup ] = useState(false);

    const handleOpenAutoField = () => setAutoFieldPopup(true);
    const handleCloseAutoField = () => setAutoFieldPopup(false);
    
    const handleSave = async function() {
        const id = Number(assetId);
        if (isNaN(id)) return;

        setSaving(true);
        
        await saveAdminEditAsset(id, fieldStates, [ originAsset, setOriginAsset ]);
        
        setSaving(false);
    }

    const requestDataRefresh = async function() {
        if (assetId)
            await adminAssetEditLoad(assetId, { alive: true}, fieldStates, setOriginAsset);
    }

    useEffect(() => {
        if (!assetId) return;

        const aliveRef = { alive: true };
        
        adminAssetEditLoad(assetId, aliveRef, fieldStates, setOriginAsset);

        return () => {
            aliveRef.alive = false;
        }
    }, [ assetId ]);

    if (originAsset === null) {
        return <AdminAssetEditLoading />;
    }

    return <main className={`${baseStyle.screen} ${style.screen}`}>
        <MetaTag title={`${originAsset ? `${originAsset.title} - ` : ''}에셋 수정`} />
        <AdminEditContent fields={fieldStates} updated={isDifferent} onSave={handleSave} />
        <AdminEditSide fields={fieldStates} onOpenAutoField={handleOpenAutoField} />
        <AdminEditAutoFieldDialog show={autoFieldPopup} onClose={handleCloseAutoField} onRefresh={requestDataRefresh} />
        {saving && <AdminAssetEditSaveLoading />}
    </main>
}