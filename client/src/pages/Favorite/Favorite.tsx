import { useAssetSearchOption } from "@components/AssetsList/hook";
import AssetsListSideTagOption from "@components/AssetsList/Side/Tag/Option";
import SideSection from "@components/AssetsList/SideSection";
import FavoriteHead from "@components/Favorite/Head";
import FavoriteSelectList from "@components/Favorite/List";
import FavoriteBaseList from "@components/Favorite/ListBase";
import FavoriteSelectHead from "@components/Favorite/SelectHead";
import { FavoriteTagContextProvider } from "@components/Favorite/Tag/Context";
import MetaTag from "@components/MetaTag/MetaTag";
import { AliveType } from "@domiTypes/alive";
import { AssetPreviewVO } from "@domiTypes/asset";
import { PageContentVO } from "@domiTypes/page";
import originStyle from '@styles/assetsList/style.module.scss';
import { request } from "@utils/request";
import { useEffect, useState } from "react";

export default function Favorite() {
    const [ assets, setAssets ] = useState<AssetPreviewVO[] | null>(null);
    const [ selectAssets, setSelectAssets ] = useState<Set<number> | null>(null);
    const isSelecting = selectAssets !== null;

    const searchOptions =  useAssetSearchOption();

    const loadAssets = async function(aliveRef: AliveType) {
        const result = await request<PageContentVO<AssetPreviewVO>>("asset/search", { params: { favorite: true, ...searchOptions } });
        if (!aliveRef.alive) return;
        
        setAssets(result.data.items);
    }

    const handleSelectClick = function() {
        setSelectAssets(isSelecting ? null : new Set());
    }

    const handleAssetSelect = function(id: number) {
        if (selectAssets === null) return;

        const newSelects = new Set(Array.from(selectAssets))
        
        if (newSelects.has(id)) {
            newSelects.delete(id);
        } else {
            newSelects.add(id);
        }

        setSelectAssets(newSelects);
    }

    const handleCheck = function(checked: boolean) {
        if (!assets) return;
        
        setSelectAssets(new Set( checked ? assets.map(v => v.id) : [] ));
    }

    const emptySelectOff = function() {
        if (!isSelecting || !assets || !selectAssets) return;

        const newSelect = new Set<number>();
        const currentIds = new Set(assets.map(v => v.id));
        
        selectAssets.forEach(v => {
            if (currentIds.has(v))
                newSelect.add(v);
        });

        setSelectAssets(newSelect);
    }

    const handleAssetRemove = function() {
        if (!assets || !selectAssets) return;
        
        const newAssets = assets.filter(v => !selectAssets.has(v.id));
        setAssets(newAssets);
    }

    useEffect(() => {
        const aliveRef = { alive: true };

        setAssets(null);
        loadAssets(aliveRef);

        return () => {
            aliveRef.alive = false;
        }
    }, [ ...Object.values(searchOptions) ]);

    useEffect(emptySelectOff, [ assets ]);

    return <main className={originStyle.main}>
        <FavoriteTagContextProvider>
            <MetaTag title='찜찜한 에셋' />
            
            {/* 카테고리 이런거 */}
            <SideSection additional={<AssetsListSideTagOption />} />

            {/* 리스트 */}
            <article className={originStyle.content}>
                <FavoriteHead selecting={isSelecting} onSelect={handleSelectClick} />
                {isSelecting && <FavoriteSelectHead selects={selectAssets} assets={assets} onCheck={handleCheck} onRemove={handleAssetRemove} />}

                {/* 선택 할때 */}
                {/* <FavoriteSelectList /> */}

                {/* 선택 안할때 */}
                {/* <FavoriteBaseList list={assets} /> */}

                {isSelecting ? <FavoriteSelectList list={assets} selects={selectAssets} onSelect={handleAssetSelect} /> : <FavoriteBaseList list={assets} />}
            </article>
        </FavoriteTagContextProvider>
    </main>;
}