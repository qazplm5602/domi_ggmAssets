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

export default function AdminAssetEdit() {
    const titleState = useState("");
    const fileLinkState = useState("");
    const storeLinkState = useState("");
    const versionState = useState("");
    // 카테고리는 어케하지
    // 플랫폼 어카지
    // 제작자 어카지
    const createAtState = useState("");
    // 이미지 필드 어카지
    // 호환성 어카지
    const shortDescState = useState("");
    const descriptionState = useState("");
    const artistState = useState("");
    const platformState = useState<AssetBaseVO['platform']>(null);
    const supportsState = useState<CompatibilityVO[]>([]);
    const categoryState = useState<number | null>(null);
    const imagesState = useState<ThumbnailLocalVO[]>([]);

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
        images: imagesState
    };

    ////// 원본 에셋
    const [ originAsset, setOriginAsset ] = useState<AssetAllVO | null>(null);
    const { id: assetId } = useParams();

    const isDifferent = useMemo(() => originAsset !== null && hasAssetEditFieldUpdated(fieldStates, originAsset), [ originAsset, ...Object.values(fieldStates).map(v => v[0]) ]);

    useEffect(() => {
        if (!assetId) return;

        const aliveRef = { alive: true };
        
        adminAssetEditLoad(assetId, aliveRef, fieldStates, setOriginAsset);

        return () => {
            aliveRef.alive = false;
        }
    }, [ assetId ]);

    if (originAsset == null) {
        return <main className={`${baseStyle.screen} ${style.screen}`}>
            짜치는 로딩
        </main>
    }

    return <main className={`${baseStyle.screen} ${style.screen}`}>
        <AdminEditContent fields={fieldStates} updated={isDifferent} />
        <AdminEditSide fields={fieldStates} />
    </main>
}