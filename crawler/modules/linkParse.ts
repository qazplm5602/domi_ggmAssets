import UrlPattern from "url-pattern";
import { DomiError } from "./error.ts";

export function getIdByUnityStoreUrl(url: string) {
    const urlParse = new URL(url);

    if (urlParse.host !== "assetstore.unity.com") {
        throw new DomiError(400, "not unity url");
    }

    const uri = urlParse.pathname;
    let detectId = Number(url.substring(url.lastIndexOf('-') + 1));
    
    // 이건 그냥 다른 URL 인듯
    if (isNaN(detectId)) {
        const pattern = new UrlPattern("/packages/package/:id");
        const query = pattern.match(uri);
        
        detectId = Number(query?.id);
    }

    // 아직도 id 를 못가져 왔다고????
    if (isNaN(detectId)) {
        throw new DomiError(400, "not unity url");
    }

    return detectId;
}

// 주인장 도메인 가져오면서도 itchio 링크가 맞는지 확인 ㅁㄴㅇㄹ
export function getItchioOwnerHost() {
    
}