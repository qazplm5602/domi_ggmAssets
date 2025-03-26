import assetsStoreLogo from '@assets/unity-assets-logo.svg';
import itchioLogo from '@assets/itchio-logo.svg';
import { AssetPreviewVO } from '@domiTypes/asset';

export function getThumbnailURL(name: string) {
    return `/files/thumbnail/${name}`;
}

export function getPlatformLogoURL(platform: AssetPreviewVO['platform']) {
    switch (platform) {
        case "Itchio":
            return itchioLogo;
        case "Unity":
            return assetsStoreLogo;
    }
}