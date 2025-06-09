import { AliveType } from "@domiTypes/alive";
import { FavoriteTagContextData, FavoriteTagVO } from "@domiTypes/favoriteTag";
import { request } from "@utils/request";
import { createContext, useContext, useEffect, useState } from "react"

// Context API
const contextDefaultValue: FavoriteTagContextData = {
    tags: null,
    setTags: undefined
}
export const favoriteTagContext = createContext<FavoriteTagContextData>(contextDefaultValue);

// 커스텀 Hook
export function useFavoriteTagList(): [ FavoriteTagContextData['tags'], React.Dispatch<React.SetStateAction<FavoriteTagVO[] | null>> ] {
    const data = useContext(favoriteTagContext);

    if (data.setTags === undefined)
        throw new Error("엥?? FavoriteTagContextProvider 안에서 실행한 훅이 아닌디?");

    return [ data.tags, data.setTags ];
}

// Provider
type Props = {
    children?: React.ReactNode
}

export function FavoriteTagContextProvider({ children }: Props) {
    const [ tags, setTags ] = useState<FavoriteTagVO[] | null>(null);

    const loadTags = async function(aliveRef: AliveType) {
        const result = await request<FavoriteTagVO[]>("asset/tag");
        if (!aliveRef.alive) return;

        setTags(result.data);
    }

    useEffect(() => {
        const aliveRef = { alive: true };
        
        loadTags(aliveRef);

        return () => {
            aliveRef.alive = false;
        }
    }, []);

    return <favoriteTagContext.Provider value={{ tags, setTags }}>
        {children}
    </favoriteTagContext.Provider>;
}