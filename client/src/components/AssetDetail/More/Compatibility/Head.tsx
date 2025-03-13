import style from '@styles/assetDetail/more.module.scss';

export default function AssetDetailMoreCompatibilityHead() {
    return <article className={`${style.fill} ${style.head}`}>
        <div>Unity 버전</div>
        <div>Built-in</div>
        <div>URP</div>
        <div>HDRP</div>
    </article>;
}