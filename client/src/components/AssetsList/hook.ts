import { useSearchParams } from "react-router-dom";

export interface AssetSearchOption {
    category: string,
    order: string,
    amount: string,
    page: string
}

function getParams(key: string, defaultVal: string, onlyNum: boolean = false) {
    const [ searchParams ] = useSearchParams();
    
    let value = searchParams.get(key);

    if (!value || (onlyNum && isNaN(Number(value))))
        value = defaultVal;

    return value;
}

export function useAssetSearchOption(): AssetSearchOption {
    return {
        amount: getParams("amount", "16", true),
        category: getParams("category", ""),
        order: getParams("order", "0", true),
        page: getParams("page", "1", true)
    };
}

export function useSetAssetSearchOption() {
    const [ _, setSearchParams ] = useSearchParams();

    return function(values: Partial<AssetSearchOption>) {
        setSearchParams(values);
    }
}