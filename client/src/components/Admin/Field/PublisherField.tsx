import style from '@styles/admin/edit.module.scss';
import AdminField from './Field';
import Input from '../Inputs/Input';
import { ReactState } from '@domiTypes/react';
import { AssetBaseVO } from '@domiTypes/asset';

type Props = {
    className?: string,
    artist: ReactState<string>,
    platform: ReactState<AssetBaseVO['platform']>
}

export default function AdminEditPublisherField({ className, artist, platform: [ platform, setPaltform ] }: Props) {
    const handlePlatformChange = function(e: React.ChangeEvent<HTMLSelectElement>) {
        let value = (e.target.value || null) as AssetBaseVO['platform'];
        setPaltform(value);
    }
    
    return <AdminField title='배급사' className={className}>
        <section className={style.verticalField}>
            <h4>플랫폼</h4>
            <select value={platform || ''} onChange={handlePlatformChange}>
                <option value=''>없음</option>
                <option value="Unity">UnityAssetStore</option>
                <option value="Itchio">Itch.io</option>
            </select>
        </section>
        
        <section className={style.verticalField}>
            <h4>제작자</h4>
            <Input placeholder='제작자를 입력하세요.' autoValue={artist} />
        </section>
    </AdminField>;
}