import AdminFileLinkField from '@components/Admin/Field/FileLinkField';
import AdminHead from '@components/Admin/Head';
import AdminStoreLinkField from '@components/Admin/Field/StoreLinkField';
import baseStyle from '@styles/admin/style.module.scss';
import style from '@styles/admin/upload.module.scss';
import VersionField from '@components/Admin/Field/VersionField';
import AdminUploadInteraction from '@components/Admin/UploadInteraction';
import { useState } from 'react';
import { AssetBaseVO } from '@domiTypes/asset';

export default function AdminUpload() {
    const [ fileLink, setFileLink ] = useState("");
    const [ storeLink, setStoreLink ] = useState("");
    const [ platform, setPlatform ] = useState<AssetBaseVO['platform']>(null);
    const [ version, setVersion ] = useState("");

    return <main className={`${baseStyle.small_screen} ${style.main}`}>
        <AdminHead className={style.head} />
        
        <AdminFileLinkField className={style.field} value={[fileLink, setFileLink]} />
        <AdminStoreLinkField className={style.field} value={[storeLink, setStoreLink]} platform={[platform, setPlatform]} />
        <VersionField className={style.field} value={[version, setVersion]} />

        <AdminUploadInteraction warning={platform === null} />
    </main>;
}