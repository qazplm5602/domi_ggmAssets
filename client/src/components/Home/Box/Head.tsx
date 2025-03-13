import Button from '@components/Buttons/Button';
import style from '@styles/home/style.module.scss';

export default function HomeAssetsBoxHead() {
    return <article className={style.box_head}>
        <h2>2D 캐릭터</h2>
        <Button>전체 보기</Button>
    </article>;
}