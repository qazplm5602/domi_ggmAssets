import style from '@styles/admin/category.module.scss';
import IconButton from '@components/Buttons/IconButton';
import checkIco from '@assets/icons/check.svg';
import closeIco from '@assets/icons/close.svg';

export default function AdminCategoryItemEditContent() {
    return <>
        <input type="text" className={style.rename} placeholder='카테고리 이름을 입력하세요.' />
        
        <section className={style.interaction}>
            <IconButton icon={checkIco} />
            <IconButton icon={closeIco} />
        </section>
    </>;
}