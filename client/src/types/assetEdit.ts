import { AssetBaseVO } from "./asset";
import { ReactState } from "./react";

export interface AssetEditFieldStates {
    title: ReactState<string>,
    fileLink: ReactState<string>,
    storeLink: ReactState<string>,
    version: ReactState<string>,
    createAt: ReactState<string>,
    shortDesc: ReactState<string>,
    description: ReactState<string>,
    platform: ReactState<AssetBaseVO['platform']>,
    artist: ReactState<string>
}