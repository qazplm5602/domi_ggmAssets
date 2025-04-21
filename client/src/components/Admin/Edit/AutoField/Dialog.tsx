import style from '@styles/admin/edit.module.scss';

import AdminStoreLinkField from "@components/Admin/Field/StoreLinkField";
import Dialog from "@components/Dialog/Dialog";
import Button from '@components/Buttons/Button';
import { useState } from 'react';
import { AssetBaseVO } from '@domiTypes/asset';
import AdminEditAutoFieldDialogOption from './Option';
import { AutoFieldCheckState } from '@domiTypes/assetAutoField';

type Props = {
    show: boolean,
    onClose?: () => void
}

export default function AdminEditAutoFieldDialog({ show, onClose }: Props) {
    const [ link, setLink ] = useState("");
    const [ platform, setPlatform ] = useState<AssetBaseVO['platform']>(null);
    const platformNotSupport = platform === null;

    const checkStates: AutoFieldCheckState = {
        title: useState(true),
        fileSize: useState(true),
        category: useState(true),
        platform: useState(true),
        publisher: useState(true),
        publishAt: useState(true),
        thumbnail: useState(true),
        supports: useState(true),
        shortDesc: useState(true),
        description: useState(true)
    };

    return <Dialog show={show} title="자동 채우기" className={style.autoFieldDialog} onClose={onClose}>
        <section className={style.container}>
            <AdminStoreLinkField className={style.field} value={[ link, setLink ]} platform={[ platform, setPlatform ]} />
            <AdminEditAutoFieldDialogOption />
        </section>

        <section className={style.interaction}>
            {platformNotSupport && <div className={style.alert}>지원되지 않는 스토어 입니다.</div>}
            <Button className={style.startBtn} disabled={platformNotSupport}>시작</Button>
        </section>
    </Dialog>
}