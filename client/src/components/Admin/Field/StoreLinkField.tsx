import style from '@styles/admin/upload.module.scss';

import AdminField from "./Field";
import Input from "../Inputs/Input";

import { AssetBaseVO } from '@domiTypes/asset';
import { useEffect } from 'react';
import { getPlatformLogoURL } from '@utils/file';
import UrlPattern from 'url-pattern';
// import questionIcon from '@assets/icons/question.svg';

type Props = {
    className?: string,
    value: [ string, React.Dispatch<React.SetStateAction<string>> ],
    platform: [ AssetBaseVO['platform'], React.Dispatch<React.SetStateAction<AssetBaseVO['platform']>> ]
}

export default function AdminStoreLinkField({ className, value, platform: [ platform, setPlatform ] }: Props) {
    const checkVerifyURL = function() {
        const url = URL.parse(value[0]);

        if (url === null)
            return null;
        

        if (url.host === "assetstore.unity.com" && url.pathname.startsWith("/packages")) { // 이건 에셋 스토엉
            const packageId = url.pathname.substring(url.pathname.lastIndexOf('-') + 1);
            
            // 다른 경로인듯
            if (packageId.length === 0 || isNaN(Number(packageId))) {
                const pattern = new UrlPattern('/packages/package/:id');
                if (pattern.match(url.pathname) === null)
                    return null;
            }

            return "Unity";
        } else if (url.host.endsWith('.itch.io') && url.pathname.length > 1) { // itch io
            return "Itchio";
        }
        
        return null;
    }
    
    useEffect(() => setPlatform(checkVerifyURL()), [ value[0] ]);

    return <AdminField title="스토어 링크" desc='해당 URL을 통해 에셋 정보를 분석하고 적용합니다.' className={className}>
        <Input placeholder='스토어에 등록되어있는 에셋 링크를 입력하세요.' autoValue={value} />
        
        <div className={style.detect}>
            {platform && <img src={getPlatformLogoURL(platform)} alt="store logo" />}
            <span>{platform ? '감지됨' : '감지되지 않음 ＼（〇_ｏ）／'}</span>
        </div>
    </AdminField>
}