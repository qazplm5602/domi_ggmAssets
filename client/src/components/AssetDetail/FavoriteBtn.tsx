import IconButton from '@components/Buttons/IconButton';
import style from '@styles/assetDetail/style.module.scss';
import { useEffect, useRef, useState } from 'react';

import markLineIcon from '@assets/icons/ic-bookmark-line.svg';
import markFillIcon from '@assets/icons/ic-bookmark.svg';
import { AliveType } from '@domiTypes/alive';
import { request } from '@utils/request';
import { generateRandomString } from '@utils/misc';
import { AxiosError } from 'axios';

type Props = {
    id: number
}

export default function AssetDetailInfoInteractionFavoriteBtn({ id }: Props) {
    const [ active, setActive ] = useState(false);
    const processRef = useRef<string>("");
    
    const loadStatus = async function(aliveRef: AliveType) {
        const result = await request<boolean>(`asset/favorite/${id}`);
        if (!aliveRef.alive) return;
        
        setActive(result.data);
    }
    
    const handleClick = async function() {
        const enable = !active;
        const token = processRef.current = generateRandomString(5);
        setActive(enable);

        const result = await request(`asset/favorite/${id}`, { method: "POST", data: enable, headers: { "Content-Type": "application/json" } }).catch(e => e as AxiosError);
        if (token !== processRef.current) return; // 머야 최신이 아님
        
        if (result instanceof AxiosError) {
            setActive(!enable);
        }
    }

    useEffect(() => {
        const aliveRef = { alive: true };

        setActive(false);
        loadStatus(aliveRef);

        return () => {
            aliveRef.alive = false;
        }
    }, [ id ]);

    return <IconButton icon={active ? markFillIcon : markLineIcon} size={23} onClick={handleClick} className={style.favorite}>
        <div className={style.tooltip}>찜{active ? '해제' : '하기'}</div>
    </IconButton>;
}