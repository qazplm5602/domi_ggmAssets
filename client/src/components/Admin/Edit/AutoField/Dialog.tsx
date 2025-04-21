import style from '@styles/admin/edit.module.scss';

import AdminStoreLinkField from "@components/Admin/Field/StoreLinkField";
import Dialog from "@components/Dialog/Dialog";
import Button from '@components/Buttons/Button';
import { useState } from 'react';
import { AssetBaseVO } from '@domiTypes/asset';
import AdminEditCategoryAutoFieldDialogOption from './Option';

type Props = {
    show: boolean,
    onClose?: () => void
}

export default function AdminEditCategoryAutoFieldDialog({ show, onClose }: Props) {
    const [ link, setLink ] = useState("");
    const [ platform, setPlatform ] = useState<AssetBaseVO['platform']>(null);

    return <Dialog show={show} title="자동 채우기" className={style.autoFieldDialog} onClose={onClose}>
        <section className={style.container}>
            <AdminStoreLinkField className={style.field} value={[ link, setLink ]} platform={[ platform, setPlatform ]} />
            <AdminEditCategoryAutoFieldDialogOption />
        </section>

        <section className={style.interaction}>
            <div className={style.alert}>지원되지 않는 스토어 입니다.</div>
            <Button className={style.startBtn}>시작</Button>
        </section>
    </Dialog>
}