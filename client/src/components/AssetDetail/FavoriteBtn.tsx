import IconButton from '@components/Buttons/IconButton';
import { useEffect, useState } from 'react';

import markLineIcon from '@assets/icons/ic-bookmark-line.svg';
import markFillIcon from '@assets/icons/ic-bookmark.svg';
import { AliveType } from '@domiTypes/alive';
import { request } from '@utils/request';

type Props = {
    id: number
}

export default function AssetDetailInfoInteractionFavoriteBtn({ id }: Props) {
    const [ active, setActive ] = useState(false);

    const loadStatus = async function(aliveRef: AliveType) {
        const result = await request<boolean>(`asset/favorite/${id}`);
        if (!aliveRef.alive) return;
        
        setActive(result.data);
    }

    useEffect(() => {
        const aliveRef = { alive: true };

        setActive(false);
        loadStatus(aliveRef);

        return () => {
            aliveRef.alive = false;
        }
    }, [ id ]);

    return <IconButton icon={active ? markFillIcon : markLineIcon} size={23} />;
}