import { ThumbnailVO } from '@domiTypes/asset';
import { motion } from 'framer-motion';
import style from '@styles/assetDetail/style.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { getThumbnailURL } from '@utils/file';

type Props = {
    images: ThumbnailVO[]
}

export default function AssetDetailBlurBG({ images }: Props) {
    const [ show, setShow ] = useState(false);
    
    const imageURL = useMemo(() => {
        const thumbnail = images.find(v => v.type === "Image"); // 유튜브는 안됨 ㅅㄱ
        return thumbnail?.previewUrl || thumbnail?.contentUrl; // 프리뷰 url이 없으면 그냥 진짜 사진으로 씀
    }, [ images ]);
    
    const onLoad = function() {
        if (imageURL === undefined) return; // 이게 로드가 왜 됨???
        setShow(true);
    }

    useEffect(() => {
        setShow(false);
    }, [imageURL]);

    return <motion.img
        src={getThumbnailURL(imageURL || '')}
        alt="bg blur"
        className={style.bg_blur}
        draggable={false}
        onLoad={onLoad}

        initial={{ opacity: 0 }}
        animate={{ opacity: show ? 1 : 0 }}
    />
}