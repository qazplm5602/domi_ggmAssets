import Button from '@components/Buttons/Button';
import { usePopupStore } from '@components/Popup/store';
import style from '@styles/admin/edit.module.scss';
import { request } from '@utils/request';
import { useNavigate, useParams } from 'react-router-dom';

export default function AdminEditSideDangerZone() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { openPopup, closePopup } = usePopupStore();

    const removeAsset = async function() {
        await request(`asset/admin/${id}`, { method: "DELETE" });
        navigate("/assets");
    }

    const handleRemove = function() {
        openPopup("삭제하시겠어요?", "등록된 정보 및 썸네일 등 복구 할 수 없습니다.", [
                { text: "삭제", color: "#D44760", callback: removeAsset },
                { text: "취소", callback: closePopup }
        ]);
    }

    return <section className={style.danger}>
        <h3>Danger Zone</h3>
        <Button onClick={handleRemove}>삭제</Button>
    </section>;
}