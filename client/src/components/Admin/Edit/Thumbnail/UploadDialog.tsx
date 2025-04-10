import style from '@styles/admin/edit.module.scss';
import Dialog from "@components/Dialog/Dialog";
import AdminEditThumbnailUploadDialogSelect from './Select';
import AdminEditThumbnailUploadDialogYoutube from './Youtube';
import { useRef, useState } from 'react';
import { usePopupStore } from '@components/Popup/store';

type Props = {
    show: boolean,
    onClose?: () => void
}

export default function AdminEditThumbnailUploadDialog({ show, onClose }: Props) {
    const [ screen, setScreen ] = useState<'select' | 'youtube'>('select');
    const fileRef = useRef<HTMLInputElement>(null);
    const { openPopup } = usePopupStore();

    const handleSelectImage = function() {
        fileRef.current?.click();
    }
    
    const handleChangeInputFile = function(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files) return; // 머가 없는디
        
        let verify = true;

        // 여러 파일 지원
        for (let i = 0; i < files.length; i++) {
            const file = files.item(i);
            if (file === null) continue;
            
            if (!file.type.startsWith("image/")) {
                verify = false;
                break;
            }
        }

        if (!verify) {
            openPopup("업로드 오류", "이미지 파일만 가능합니다.", [ { text: "확인", callback() {} } ]);
            return;
        }

        console.log(files);
    }
    
    const handleSelectYoutube = function() {
        setScreen('youtube');
    }

    const handleBackScreen = function() {
        setScreen('select');
    }

    return <Dialog title="썸네일 업로드" show={show} className={style.thumbnailUploadDialog} onClose={onClose}>
        {screen === 'select' && <AdminEditThumbnailUploadDialogSelect onSelectImage={handleSelectImage} onSelectYoutube={handleSelectYoutube} />}
        {screen === 'youtube' && <AdminEditThumbnailUploadDialogYoutube onBack={handleBackScreen} />}

        {/* 이미지 파일 넣는곳 */}
        <input type="file" style={{ display: "none" }} ref={fileRef} onChange={handleChangeInputFile} accept='image/*' multiple />
    </Dialog>
}