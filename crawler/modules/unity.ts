import { CompatibilityVO, ThumbnailVO, UnityStoreProduct } from "./asset.ts";
import { CrawlerCallbackType, registerPlatformHandler } from "./crawler.ts";
import { DomiError } from "./error.ts";
import { getIdByUnityStoreUrl } from "./linkParse.ts";

const unityAssetDataLoadhandler: CrawlerCallbackType = async function(req) {
    const url = req.body?.url;
    
    if (!url) {
        throw new DomiError(400, "invalid url");
    }

    const assetId = getIdByUnityStoreUrl(url);
    
    const headers: HeadersInit  = {
        Cookie: "_csrf=domi;NEXT_LOCALE=ko-KR;",
        Origin: "https://assetstore.unity.com",
        Referer: "https://assetstore.unity.com/",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6",
        "X-Csrf-Token": "domi",
        "X-Requested-with": "XMLHttpRequest",
        "X-Source": "storefront"
    };
    
    const body = [
        {
            "query": "query ProductReview($id: ID!, $rows: Int, $page: Int, $sort_by: String, $reviewId: String, $rating: String) {\n  product(id: $id) {\n    ...product\n    reviews(rows: $rows, page: $page, sortBy: $sort_by, reviewId: $reviewId, rating: $rating) {\n      ...reviews\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment product on Product {\n  id\n  productId\n  itemId\n  slug\n  name\n  description\n  aiDescription\n  elevatorPitch\n  keyFeatures\n  compatibilityInfo\n  srps {\n    version\n    types\n    __typename\n  }\n  rating {\n    average\n    count\n    __typename\n  }\n  currentVersion {\n    id\n    name\n    publishedDate\n    __typename\n  }\n  reviewCount\n  downloadSize\n  assetCount\n  publisher {\n    id\n    name\n    url\n    supportUrl\n    supportEmail\n    gaAccount\n    gaPrefix\n    __typename\n  }\n  mainImage {\n    big\n    facebook\n    small\n    icon\n    icon75\n    __typename\n  }\n  originalPrice {\n    itemId\n    originalPrice\n    finalPrice\n    isFree\n    discount {\n      save\n      percentage\n      type\n      saleType\n      __typename\n    }\n    currency\n    entitlementType\n    __typename\n  }\n  images {\n    type\n    imageUrl\n    thumbnailUrl\n    __typename\n  }\n  category {\n    id\n    name\n    slug\n    longName\n    __typename\n  }\n  firstPublishedDate\n  publishNotes\n  supportedUnityVersions\n  state\n  overlay\n  overlayText\n  popularTags {\n    id\n    pTagId\n    name\n    __typename\n  }\n  plusProSale\n  licenseText\n  vspProperties {\n    ... on ExternalVSPProduct {\n      externalLink\n      __typename\n    }\n    __typename\n  }\n  packageType\n  __typename\n}\n\nfragment reviews on Reviews {\n  count\n  canRate: can_rate\n  canReply: can_reply\n  canComment: can_comment\n  hasCommented: has_commented\n  totalEntries: total_entries\n  lastPage: last_page\n  comments {\n    id\n    date\n    editable\n    rating\n    user {\n      id\n      name\n      profileUrl\n      avatar\n      __typename\n    }\n    isHelpful: is_helpful {\n      count\n      score\n      __typename\n    }\n    subject\n    version\n    full\n    is_complimentary\n    vote\n    replies {\n      id\n      editable\n      date\n      version\n      full\n      user {\n        id\n        name\n        profileUrl\n        avatar\n        __typename\n      }\n      isHelpful: is_helpful {\n        count\n        score\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n",
            "variables": {
                "id": assetId.toString(),
                "rows": 10,
                "page": 1,
                "sort_by": "recent",
                "rating": null
            },
            "operationName": "ProductReview"
        }
    ];

    const result = await fetch("https://assetstore.unity.com/api/graphql/batch", { method: "POST", headers: headers, body: JSON.stringify(body) });
    if (result.status !== 200)
        throw new DomiError(500, "unity api error");

    const data = await result.json();
    const product = data[0].data.product as UnityStoreProduct;
    const supports: CompatibilityVO[] = [];
    const images: ThumbnailVO[] = [];

    // 서포트 컨버팅팅팅팅
    // 가독성 포기 for... (성능 짱짱짱짱)
    for (const element of product.srps) {
        let builtIn = false;
        let urp = false;
        let hdrp = false;
        
        for (const pipeline of element.types) {
            switch (pipeline) {
                case 'standard':
                    builtIn = true;
                    break;
                case 'lightweight':
                    urp = true;
                    break;
                case 'hd':
                    hdrp = true;
                    break;
                default:
                    break;
            }
        }

        supports.push({ version: element.version, builtIn, urp, hdrp });
    }

    // 이미지
    for (const element of product.images) {
        let type: ThumbnailVO['type'] = 'Image';

        switch (element.type) {
            case "screenshot":
                // type = 'Image'; // 어차피 기본값이 image임
                break;
            case 'youtube':
                type = 'Youtube';
                break;

            default:
                continue; // 다른 type이면 안넣음 ㅅㄱ
        }
        
        images.push({
            type,
            contentUrl: element.imageUrl,
            previewUrl: element.thumbnailUrl
        });
    }

    // 내가 만든 데베에 맞게 함 ㅁㄴㅇㄹ
    return {
        id: Number(product.id),
        title: product.name,
        desc: product.description,
        shortDesc: product.elevatorPitch,
        publisher: product.publisher.name,
        publishAt: product.firstPublishedDate,
        supports,
        images: images,
        version: product.currentVersion.name,
        category: product.category.longName,
        size: Number(product.downloadSize)
    };
}

registerPlatformHandler("unity", unityAssetDataLoadhandler);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        