import style from '@styles/admin/edit.module.scss';
import Dialog from "@components/Dialog/Dialog";
import AdminEditThumbnailUploadDialogSelect from './Select';
import AdminEditThumbnailUploadDialogYoutube from './Youtube';
import { useRef, useState } from 'react';
import { usePopupStore } from '@components/Popup/store';
import { ThumbnailLocalVO } from '@domiTypes/assetEdit';

type Props = {
    show: boolean,
    onClose?: () => void,
    onAdd?: (images: ThumbnailLocalVO[]) => void
}

export default function AdminEditThumbnailUploadDialog({ show, onClose, onAdd }: Props) {
    const [ screen, setScreen ] = useState<'select' | 'youtube'>('select');
    const [ closeBlock, setCloseBlock ] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);
    const { openPopup } = usePopupStore();

    const handleClose = function() {
        if (closeBlock) return;

        if (onClose)
            onClose();
    }

    const handleSelectImage = function() {
        fileRef.current?.click();
    }
    
    const handleChangeInputFile = function(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files) return; // 머가 없는디 
        
        let verify = true;
        const images: ThumbnailLocalVO[] = [];

        // 여러 파일 지원
        for (let i = 0; i < files.length; i++) {
            const file = files.item(i);
            if (file === null) continue;
            
            if (!file.type.startsWith("image/")) {
                verify = false;
                break;
            }

            images.push({
                type: 'Image',
                local: true,
                contentUrl: '',
                previewUrl: '',
                contentFile: file,
                previewFile: undefined
            });
        }

        if (!verify) {
            openPopup("업로드 오류", "이미지 파일만 가능합니다.", [ { text: "확인", callback() {} } ]);
            return;
        }

        if (onAdd)
            onAdd(images);
    }
    
    const handleSelectYoutube = function() {
        setScreen('youtube');
    }

    const handleBackScreen = function() {
        setScreen('select');
    }

    const handleYoutubeStarting = function() {
        setCloseBlock(true);
    }

    const handleYoutubeUpload = function(image: ThumbnailLocalVO) {
        setCloseBlock(false);
        
        if (onAdd)
            onAdd([image]);
    }

    return <Dialog title="썸네일 업로드" show={show} className={style.thumbnailUploadDialog} onClose={handleClose}>
        {screen === 'select' && <AdminEditThumbnailUploadDialogSelect onSelectImage={handleSelectImage} onSelectYoutube={handleSelectYoutube} />}
        {screen === 'youtube' && <AdminEditThumbnailUploadDialogYoutube onBack={handleBackScreen} onUploading={handleYoutubeStarting} onAdd={handleYoutubeUpload} />}

        {/* 이미지 파일 넣는곳 */}
        <input type="file" style={{ display: "none" }} ref={fileRef} onChange={handleChangeInputFile} accept='image/*' multiple />
    </Dialog>
}