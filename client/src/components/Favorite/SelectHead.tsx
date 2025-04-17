import Button from '@components/Buttons/Button';
import style from '@styles/favorite/style.module.scss';
import FavoriteSelectHeadCheck from './SelectHeadCheck';
import { formatNumberWithCommas } from '@utils/misc';
import { AssetPreviewVO } from '@domiTypes/asset';
import { usePopupStore } from '@components/Popup/store';
import { useState } from 'react';
import { request } from '@utils/request';
import { AxiosError } from 'axios';

type Props = {
    selects: Set<number>,
    assets: AssetPreviewVO[] | null,
    onCheck?: (check: boolean) => void,
    onRemove?: () => void
}

export default function FavoriteSelectHead({ selects, assets, onCheck, onRemove }: Props) {
    const allChecked = assets !== null &&  assets.length > 0 && selects.size === assets.length;
    const { openPopup, closePopup } = usePopupStore();
    const [ removeLoading, setRemoveLoading ] = useState(false);

    const removeSelectAssets = async function() {
        setRemoveLoading(true);
        
        const selectList = Array.from(selects);
        const response = await request("asset/favorite/bulk", { method: "DELETE", data: selectList })
            .catch(e => e as AxiosError);
        
        setRemoveLoading(false);

        if (response instanceof AxiosError) {
            openPopup("오류", "오류가 발생하였습니다. 나중에 다시 시도하세요.", [
                { text: "취소", callback: closePopup }
            ]);
            return;
        }

        if (onRemove)
            onRemove();
    }

    const openSelectAssets = async function() {
        const selectList = Array.from(selects);
        const response = await request<string[]>("asset/download/bulk", { method: "POST", data: selectList })
        .catch(e => e as AxiosError);

        if (response instanceof AxiosError) {
            openPopup("오류", "오류가 발생하였습니다. 나중에 다시 시도하세요.", [
                { text: "취소", callback: closePopup }
            ]);
            return;
        }

        console.log(response.data);
    }

    const handleRemove = function() {
        openPopup("삭제하시겠어요?", <p>찜한 에셋 {formatNumberWithCommas(selects.size)}개를 삭제하시겠습니까?</p>, [
                { text: "삭제", color: "#D44760", callback: removeSelectAssets },
                { text: "취소", callback: closePopup }
        ]);
    }

    const handleDownload = function() {
        openPopup("다운로드 링크를 여시겠어요?", <p>{formatNumberWithCommas(selects.size)}개 에셋 다운로드 링크가 새탭으로 열립니다.</p>, [
            { text: "열기", color: "#3283D5", callback: openSelectAssets },
            { text: "취소", callback: closePopup }
        ]);
    }
    
    return <section className={style.selectHead}>
        <article className={style.left}>
            <FavoriteSelectHeadCheck all={allChecked} active={allChecked || selects.size > 0} onChange={onCheck} />
            <div className={style.amount}>{formatNumberWithCommas(selects.size)}개 선택함</div>
        </article>
        
        <article className={style.right}>
            <Button className={style.download} onClick={handleDownload}>다운로드</Button>
            <Button className={style.remove} onClick={handleRemove} disabled={removeLoading}>삭제</Button>
        </article>
    </section>
}