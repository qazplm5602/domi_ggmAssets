import style from '@styles/admin/edit.module.scss';
import Dialog from "@components/Dialog/Dialog";
import AdminEditThumbnailUploadDialogSelect from './Select';
import AdminEditThumbnailUploadDialogYoutube from './Youtube';
import { useState } from 'react';

type Props = {
    show: boolean,
    onClose?: () => void
}

export default function AdminEditThumbnailUploadDialog({ show, onClose }: Props) {
    const [ screen, setScreen ] = useState<'select' | 'youtube'>('select');

    const handleSelectImage = function() {
         
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
    </Dialog>
}