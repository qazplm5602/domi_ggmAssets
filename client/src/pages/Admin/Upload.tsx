import AdminFileLinkField from '@components/Admin/Field/FileLinkField';
import AdminHead from '@components/Admin/Head';
import AdminStoreLinkField from '@components/Admin/Field/StoreLinkField';
import baseStyle from '@styles/admin/style.module.scss';
import style from '@styles/admin/upload.module.scss';
import AdminUploadInteraction from '@components/Admin/UploadInteraction';
import { useState } from 'react';
import { AssetBaseVO } from '@domiTypes/asset';
import { request } from '@utils/request';
import { usePopupStore } from '@components/Popup/store';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@domiTypes/request';
import { useNavigate } from 'react-router-dom';
import MetaTag from '@components/MetaTag/MetaTag';
import AdminVersionField from '@components/Admin/Field/Version/FieldSection';
import VersionBaseInput from '@components/Admin/Field/Version/BaseInput';

export default function AdminUpload() {
    const [ fileLink, setFileLink ] = useState("");
    const [ storeLink, setStoreLink ] = useState("");
    const [ platform, setPlatform ] = useState<AssetBaseVO['platform']>(null);
    const [ version, setVersion ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const { openPopup } = usePopupStore();
    const navigate = useNavigate();

    const handleUpload = async function() {
        const hasPlatform = platform !== null;

        if (fileLink.length === 0) {
            openPopup("오류", "다운로드 링크를 입력해야 합니다.", [
                { text: "확인", callback() {} }
            ]);
            return;
        }

        setLoading(true);
        
        const data = {
            download: fileLink,
            store: storeLink,
            platform,
            version
        };
        const response = await request<number>("asset/admin/upload", { method: "POST", data })
            .catch(e => e as AxiosError<ErrorResponse>);
        
        setLoading(false);

        if (response instanceof AxiosError) {
            const data = response.response?.data;
            const content = <>
                <p>에셋을 업로드 할 수 없습니다.</p>
                <p>코드: {data?.code} / 메세지: {data?.message}</p>
            </>;
            openPopup("오류", content, [
                { text: "확인", callback() {} }
            ]);
            return;
        }

        navigate(hasPlatform ? `/asset/${response.data}` : `/admin/edit/${response.data}`);
    }

    return <main className={`${baseStyle.small_screen} ${style.main}`}>
        <MetaTag title='에셋 업로드' />

        <AdminHead className={style.head} />
        
        <AdminFileLinkField className={style.field} value={[fileLink, setFileLink]} />
        <AdminStoreLinkField className={style.field} value={[storeLink, setStoreLink]} platform={[platform, setPlatform]} />
        <AdminVersionField className={style.field}>
            <VersionBaseInput autoValue={[version, setVersion]} />
        </AdminVersionField>

        <AdminUploadInteraction warning={platform === null} loading={loading} onUpload={handleUpload} />
    </main>;
}