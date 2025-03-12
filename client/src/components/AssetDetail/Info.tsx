import style from '@styles/assetDetail/style.module.scss';
import AssetDetailInfoText from './InfoText';
import AssetDetailInfoInteraction from './InfoInteraction';

export default function AssetDetailInfo() {
    return <div className={style.info}>
        <AssetDetailInfoText title='파일 크기' value='1.1 GB' />
        <AssetDetailInfoText title='등록된 날짜' value='2024년 10월 25일' />
        <AssetDetailInfoText title='지원' value='웹사이트 방문' />

        <AssetDetailInfoInteraction />
    </div>
}