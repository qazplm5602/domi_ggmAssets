import style from '@styles/assetsList/side.module.scss';

export default function AssetsListSideCategoryBox() {
    return <>
        <div className={style.category}>
            <input type="checkbox" id='domitest' className={style.check} />
            <label htmlFor="domitest">3D</label>
            {/* <p>3D</p> */}
            <button></button>
        </div>

        {/* 하위 카테고리까지 선택 ㅁㄴㅇㄹ */}
        {/* ... */}
    </>;
}