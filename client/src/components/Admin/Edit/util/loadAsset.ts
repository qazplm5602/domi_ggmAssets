import { AliveType } from "@domiTypes/alive";
import { AssetAllVO } from "@domiTypes/asset";
import { AssetEditFieldStates } from "@domiTypes/assetEdit";
import { request } from "@utils/request";
import { adminAssetFieldFill } from "./fieldFill";

export async function adminAssetEditLoad(assetId: string, aliveRef: AliveType, fields: AssetEditFieldStates, setOriginAsset: React.Dispatch<React.SetStateAction<AssetAllVO | null>>) {
    const response = await request<AssetAllVO>(`asset/admin/${assetId}/detail`);
    if (!aliveRef.alive) return;

    setOriginAsset(response.data);
    adminAssetFieldFill(response.data, fields);
}