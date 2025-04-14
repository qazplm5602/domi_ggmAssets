import AssetItem from '@components/AssetsList/Item/Item';
import { ThumbnailVO } from '@domiTypes/asset';
import { AssetEditFieldStates, ThumbnailLocalVO } from '@domiTypes/assetEdit';
import style from '@styles/admin/edit.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Props = {
    fields: AssetEditFieldStates
}

export default function AdminEditPreviewAsset({ fields }: Props) {
    const { id: assetId } = useParams();
    const [ loadedImages, setLoadedImages ] = useState<(ThumbnailVO | undefined)[]>([]);

    const convertLocalToPublicThumbnail = function() {
        let alive = true;

        // 미리 되어있는건 넣기
        const imageThumbnails = fields.images[0].filter(v => v.type === 'Image');

        const alreadyImages: (ThumbnailLocalVO | undefined)[] = [ ...imageThumbnails ];
        alreadyImages.forEach((v, idx) => {
            if (v?.local)
                alreadyImages[idx] = undefined;
        });

        setLoadedImages(alreadyImages);
        
        imageThumbnails
            .forEach((v, idx) => {
                if (!v.local || !v.previewFile) return;
                
                const reader = new FileReader();
                reader.onloadend = function() {
                    if (!alive) return;

                    setLoadedImages(prev => {
                        if (typeof reader.result !== "string")
                            return prev;

                        const newList = [ ...prev ];
                        const newData = { ...v };
                        newData.previewUrl = reader.result;
    
                        newList[idx] = newData;
                        return newList;
                    });
                }

                reader.readAsDataURL(v.previewFile);
            });

        return () => {
            alive = false;
        }
    }

    useEffect(convertLocalToPublicThumbnail, [ fields.images[0] ]);

    return <div className={style.previewAsset}>
        <AssetItem data={{
            category: null,
            id: Number(assetId),
            platform: fields.platform[0],
            publisher: fields.artist[0],
            thumbnail: { size: loadedImages.length, images: loadedImages as ThumbnailVO[] },
            title: fields.title[0],
        }} />
    </div>;
}