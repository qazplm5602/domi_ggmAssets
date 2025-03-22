import style from '@styles/home/style.module.scss';
import HomeAssetsBox from './Box/AssetsBox';
import { useState } from 'react';
import { CategoryVO } from '@domiTypes/category';
import { useHandleAlive } from '@utils/requestEventHook';
import { AliveType } from '@domiTypes/alive';
import { request } from '@utils/request';

export default function HomeContent() {
    const [ categorys, setCategorys ] = useState<CategoryVO[] | null>(null);
    
    const handleLoad = async function(aliveRef: AliveType) {
        const result = await request<CategoryVO[]>("asset/category/random");
        if (!aliveRef.alive) return;
        
        setCategorys(result.data);
    }
    useHandleAlive(handleLoad, []);

    if (categorys === null)
        return;

    return <section className={style.assets}>
        {categorys.map(v => <HomeAssetsBox key={v.id} category={v} />)}
    </section>
}