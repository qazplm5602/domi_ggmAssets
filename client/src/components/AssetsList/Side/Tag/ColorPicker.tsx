import style from '@styles/assetsList/side.module.scss';

export default function AssetsListSideTagColorPicker() {
    return <div className={style.colorPicker}>
        <button style={{ backgroundColor: "#FF8800" }}></button>
        <button style={{ backgroundColor: "#FF8800" }}></button>
        <button style={{ backgroundColor: "#FF8800" }}></button>
        <button style={{ backgroundColor: "#FF8800" }}></button>
    </div>;
}