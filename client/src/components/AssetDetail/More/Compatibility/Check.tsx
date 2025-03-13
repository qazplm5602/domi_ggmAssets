import style from '@styles/assetDetail/more.module.scss';
import checkIcon from '@assets/icons/check.svg';
import AssetDetailMoreCompatibilityIconText from './IconText';

type Props = {
    active: boolean
}

export default function AssetDetailMoreCompatibilityCheck({ active }: Props) {
    return <AssetDetailMoreCompatibilityIconText className={active ? style.success : ""} text={active ? "지원" : "미지원"} icon={checkIcon} />;
}