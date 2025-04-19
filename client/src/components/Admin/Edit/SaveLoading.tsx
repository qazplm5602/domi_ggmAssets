import Spinner from '@components/Spinner/Spinner';
import style from '@styles/admin/edit.module.scss';

export default function AdminAssetEditSaveLoading() {
    return <div className={style.saveLoading}>
        <div className={style.box}>
            <Spinner className={style.spinner} />

            <h1>저장하는중...</h1>
            <span>저장하는 동안 페이지를 끄지 마세요.</span>
        </div>
    </div>;
}