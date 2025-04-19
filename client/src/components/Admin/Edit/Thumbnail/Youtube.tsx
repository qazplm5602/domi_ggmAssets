import AdminField from '@components/Admin/Field/Field';
import Input from '@components/Admin/Inputs/Input';
import Button from '@components/Buttons/Button';
import style from '@styles/admin/edit.module.scss';
import { useMemo, useState } from 'react';
import { parseIdByYoutubeLink } from '../util/youtube';
import Spinner from '@components/Spinner/Spinner';
import axios from 'axios';
import { ThumbnailLocalVO } from '@domiTypes/assetEdit';

type Props = {
    onBack?: () => void,
    onUploading?: () => void,
    onAdd?: (thumbnail: ThumbnailLocalVO) => void
}

export default function AdminEditThumbnailUploadDialogYoutube({ onBack, onUploading, onAdd }: Props) {
    const [ link, setLink ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const videoId = useMemo(() => parseIdByYoutubeLink(link), [ link ]);

    const handleUpload = async function() {
        if (!videoId) return; // 링크 이상하지롱
        
        setLoading(true);

        if (onUploading)
            onUploading();

        // 썸네일 가져오깅
        const response = await axios.get<Blob>(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, { responseType: "blob" });
        const image = new File([ response.data ], "domi_thumbnail.jpg", { type: "image/jpg" });
        
        const thumbnail: ThumbnailLocalVO = {
            type: "Youtube",
            local: true,
            contentUrl: `https://www.youtube.com/embed/${videoId}`,
            previewUrl: "",
            previewFile: image
        }

        setLoading(false);

        if (onAdd)
            onAdd(thumbnail);
    }

    return <section className={`${style.content} ${style.youtube}`}>
        <AdminField title="유튜브 URL" className={style.field}>
            <Input placeholder='유튜브 영상 링크를 입력하세요.' autoValue={[ link, setLink ]} />
            {!videoId && <div className={style.alert}>유튜브 영상 링크가 아닙니다.</div>}
        </AdminField>

        <article className={style.interaction}>
            <Button onClick={onBack} disabled={loading}>뒤로가기</Button>
            <Button className={style.upload} onClick={handleUpload} disabled={loading}>{loading && <Spinner className={style.spinner} />}업로드</Button>
        </article>
    </section>;
}