import { AssetSearchOption } from "@domiTypes/asset";
import { useSearchParams } from "react-router-dom";

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
    const [ searchParams, setSearchParams ] = useSearchParams();

    return function(values: Partial<AssetSearchOption>) {
        const currentParams: { [key: string]: string } = {};
        searchParams.forEach((v, k) => {
            currentParams[k] = v;
        });

        setSearchParams({ ...currentParams, ...values });
    }
}