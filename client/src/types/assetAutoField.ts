import { ReactState } from "./react";

export interface AutoFieldCheckState {
    title: ReactState<boolean>,
    fileSize: ReactState<boolean>,
    category: ReactState<boolean>,
    platform: ReactState<boolean>,
    publisher: ReactState<boolean>,
    publishAt: ReactState<boolean>,
    thumbnail: ReactState<boolean>,
    supports: ReactState<boolean>,
    shortDesc: ReactState<boolean>,
    description: ReactState<boolean>,
}

type AutoFieldCheck = {
    [key in keyof AutoFieldCheckState]?: boolean;
};

export interface AssetAutoFieldDTO extends AutoFieldCheck {
    url: string
    storeType: string
}