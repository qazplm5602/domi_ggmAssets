import sharp from 'sharp';
import { addImage } from './thumbnail.ts';

export async function imageResizeSmall(url: string) {
    if (!url.startsWith("http"))
        url = "https:" + url;

    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    
    const fileName = url.substring(url.lastIndexOf("/"));
    // response.

    const resizeBuffer = await sharp(buffer).resize(235, 160).toBuffer();
    return await addImage(new File([ resizeBuffer ], fileName));
}