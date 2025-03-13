import style from '@styles/home/style.module.scss';
import HomeAssetsBox from './Box/AssetsBox';

export default function HomeContent() {
    return <section className={style.assets}>
        <HomeAssetsBox />
        <HomeAssetsBox />
        <HomeAssetsBox />
    </section>
}