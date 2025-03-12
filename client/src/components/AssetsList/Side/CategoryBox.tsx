import style from '@styles/assetsList/side.module.scss';
import checkIcon from '@assets/icons/check.svg';

import leftArrowSvg from '@assets/icons/arrow-left.svg';

export default function AssetsListSideCategoryBox() {
    return <>
        <div className={style.category}>
            <input type="checkbox" id='domitest' className={style.check} />
            <label htmlFor="domitest" className={style.check_design}>
                <img src={checkIcon} draggable={false} alt='check' />
            </label>
            <label htmlFor="domitest" className={style.text}>3D</label>

            {/* <p>3D</p> */}
            <button className={`${style.toggle} ${style.active}`}>
                <img src={leftArrowSvg} alt="toggle" />
            </button>
        </div>

        {/* 하위 카테고리까지 선택 ㅁㄴㅇㄹ */}
        {/* ... */}
    </>;
}