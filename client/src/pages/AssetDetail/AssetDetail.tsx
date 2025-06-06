import AssetDetailBlurBG from '@components/AssetDetail/BlurBG';
import AssetDetailHead from '@components/AssetDetail/Head';
import AssetDetailLoading from '@components/AssetDetail/Loading';
import AssetDetailMore from '@components/AssetDetail/More/MoreDetail';
import AssetDetailPreviewContainer from '@components/AssetDetail/PreviewContainer';
import MetaTag from '@components/MetaTag/MetaTag';
import { AliveType } from '@domiTypes/alive';
import { AssetDetailVO } from '@domiTypes/asset';
import style from '@styles/assetDetail/style.module.scss';
import { request } from '@utils/request';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AssetDetail() {
    const { id } = useParams();
    const [ data, setData ] = useState<AssetDetailVO | null>(null);

    const onLoad = async function(aliveRef: AliveType) {
        const result = await request<AssetDetailVO>(`asset/${id}/detail`);
        if (!aliveRef.alive) return;

        setData(result.data);
    }

    useEffect(() => {
        const aliveRef = { alive: true };
        
        onLoad(aliveRef);

        return () => {
            aliveRef.alive = false;
        }
    }, [ id ]);

    if (data === null)
        return <AssetDetailLoading />

    return <main>
        <MetaTag title={`${data ? `${data.title} - ` : ''}에셋 정보`} />

        <AssetDetailBlurBG images={data.images} />

        <section className={style.main}>
            <AssetDetailHead title={data.title} category={data.category} />
            <AssetDetailPreviewContainer data={data} />
            <AssetDetailMore data={data} />
        </section>
    </main>;
}