import style from '@styles/admin/edit.module.scss';
import Dialog from "@components/Dialog/Dialog";
import AdminEditThumbnailUploadDialogSelect from './Select';
import AdminEditThumbnailUploadDialogYoutube from './Youtube';
import { useState } from 'react';

export default function AdminEditThumbnailUploadDialog() {
    const [ screen, setScreen ] = useState<'select' | 'youtube'>('select');

    const handleSelectImage = function() {
         
    }
    
    const handleSelectYoutube = function() {
        setScreen('youtube');
    }

    const handleBackScreen = function() {
        setScreen('select');
    }

    return <Dialog title="썸네일 업로드" show={true} className={style.thumbnailUploadDialog}>
        {screen === 'select' && <AdminEditThumbnailUploadDialogSelect onSelectImage={handleSelectImage} onSelectYoutube={handleSelectYoutube} />}
        {screen === 'youtube' && <AdminEditThumbnailUploadDialogYoutube onBack={handleBackScreen} />}
    </Dialog>
}