import style from '@styles/admin/edit.module.scss';

import AdminStoreLinkField from "@components/Admin/Field/StoreLinkField";
import Dialog from "@components/Dialog/Dialog";
import Button from '@components/Buttons/Button';
import { useMemo, useState } from 'react';
import { AssetBaseVO } from '@domiTypes/asset';
import AdminEditAutoFieldDialogOption from './Option';
import { AssetAutoFieldDTO, AutoFieldCheckState } from '@domiTypes/assetAutoField';
import { request } from '@utils/request';
import { useParams } from 'react-router-dom';
import { ReactState } from '@domiTypes/react';

type Props = {
    show: boolean,
    onClose?: () => void
}

export default function AdminEditAutoFieldDialog({ show, onClose }: Props) {
    const [ link, setLink ] = useState("");
    const [ platform, setPlatform ] = useState<AssetBaseVO['platform']>(null);
    const platformNotSupport = platform === null;
    const [ loading, setLoading ] = useState(false);
    const { id: assetId } = useParams();
    
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

    const errorText = useMemo(() => {
        if (platformNotSupport)
            return "지원되지 않는 스토어 입니다.";

        if (Object.values(checkStates).every(v => !v[0]))
            return "옵션 1개 이상 선택해야 합니다.";

        if (checkStates)

        return null;
    }, [ platform, ...Object.values(checkStates).map(v => v[0]) ]);

    const handleClose = function() {
        if (loading) return;
        
        if (onClose)
            onClose();
    }

    const handleStart = async function() {
        if (platform === null) return;

        setLoading(true);

        const body: AssetAutoFieldDTO = {
            url: link,
            storeType: platform,
        };
        
        // 옵션 넣깅
        for (const entry of Object.entries(checkStates)) {
            const [ id, state ] = entry as [ keyof AutoFieldCheckState, ReactState<boolean> ];
            body[id] = state[0];
        }

        const result = await request("asset/admin/autofield", { params: { id: assetId }, data: body });
        
        setLoading(false);
    }

    return <Dialog show={show} title="자동 채우기" className={style.autoFieldDialog} onClose={handleClose}>
        <section className={style.container}>
            <AdminStoreLinkField className={style.field} value={[ link, setLink ]} platform={[ platform, setPlatform ]} />
            <AdminEditAutoFieldDialogOption checkStates={checkStates} />
        </section>

        <section className={style.interaction}>
            {errorText && <div className={style.alert}>{errorText}</div>}
            <Button className={style.startBtn} disabled={errorText !== null} onClick={handleStart}>시작</Button>
        </section>
    </Dialog>
}