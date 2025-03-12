import style from '@styles/assetDetail/style.module.scss';

export default function AssetDetailHead() {
    return <article className={style.head}>
        <h1>Fantasy Kingdom in Unity 6 | URP</h1>
        
        <section className={style.category}>
            <p>Unity 필수에셋</p>    
            <div className={style.line}></div>
            <p>자습서</p>    
        </section>
    </article>;
}