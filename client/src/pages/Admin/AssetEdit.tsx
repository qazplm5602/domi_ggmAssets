import AdminEditContent from '@components/Admin/Edit/Content';
import AdminEditSide from '@components/Admin/Edit/Side';
import baseStyle from '@styles/admin/style.module.scss';
import style from '@styles/admin/edit.module.scss';
import { useState } from 'react';
import { AssetEditFieldStates } from '@domiTypes/assetEdit';

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

    const fieldStates: AssetEditFieldStates = {
        title: titleState,
        fileLink: fileLinkState,
        storeLink: storeLinkState,
        version: versionState,
        createAt: createAtState,
        shortDesc: shortDescState,
        description: descriptionState
    };

    return <main className={`${baseStyle.screen} ${style.screen}`}>
        <AdminEditContent fields={fieldStates} />
        <AdminEditSide />
    </main>
}