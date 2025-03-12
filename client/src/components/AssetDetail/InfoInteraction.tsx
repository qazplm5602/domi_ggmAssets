import style from '@styles/assetDetail/style.module.scss';

// import markIcon from '@assets/icons/ic-bookmark-line.svg';

export default function AssetDetailInfoInteraction() {
    return <section className={style.interactions}>
        <button className={style.download}>다운로드</button>
        
        {/* <img src={markIcon} alt="" /> */}
    </section>
}