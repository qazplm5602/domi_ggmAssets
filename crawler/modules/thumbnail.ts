import fs from 'fs/promises';
import path from 'path';

const folderPath = process.env.IMAGE_PATH || 'images/';
const imageList = {};

function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters[randomIndex];
    }

    return result;
}

export async function addImage(file: File) {
    let ext = '';
    
    if (file.name.includes('.'))
        ext = file.name.substring(file.name.lastIndexOf('.'));

    const name = generateRandomString(10);

    const dir = path.join(path.resolve(), folderPath, name + ext);
    fs.writeFile(dir, await file.bytes());

    return name + ext;
}