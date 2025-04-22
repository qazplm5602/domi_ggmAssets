import { AssetBaseVO } from '@domiTypes/asset';
import style from '@styles/assetDetail/style.module.scss';
import { getPlatformLogoURL } from '@utils/file';

type Props = {
    platform: AssetBaseVO['platform']
}

export default function AssetDetailInfoStore({ platform }: Props) {
    if (!platform)
        return;

    return <div className={style.box}>
        <h3>스토어</h3>
        {platform && <img src={getPlatformLogoURL(platform)} alt="store" className={style.platform} />}
    </div>;
}