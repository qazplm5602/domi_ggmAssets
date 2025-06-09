import { FavoriteTagContextData, FavoriteTagVO } from "@domiTypes/favoriteTag";
import { createContext, useContext, useState } from "react"

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

    return <favoriteTagContext.Provider value={{ tags, setTags }}>
        {children}
    </favoriteTagContext.Provider>;
}