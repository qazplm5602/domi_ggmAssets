import { AssetAllVO } from "@domiTypes/asset";
import { AssetEditFieldStates } from "@domiTypes/assetEdit";
import { ReactState } from "@domiTypes/react";
import { getAssetEditFieldUpdatedKeys } from "./diffField";

export async function saveAdminEditAsset(assetId: number, fields: AssetEditFieldStates, [ origin, setOrigin ]: ReactState<AssetAllVO | null>) {
    if (origin === null) return;

    const otherFields = getAssetEditFieldUpdatedKeys(fields, origin);
    console.log("otherFields", otherFields);
}