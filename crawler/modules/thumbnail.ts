import fs from 'fs/promises';
import path from 'path';

const folderPath = process.env.IMAGE_PATH || 'images/';
const expireTime = Number(process.env.IMAGE_EXPIRE) || 300;
const imageList: { [key: string]: NodeJS.Timeout } = {};

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

    let name = '';
    while (name = generateRandomString(10)) {
        if (!imageList[name + ext])
            break; // 안겹친다 ~~~~
    }

    const fullName = name + ext;

    const dir = path.join(path.resolve(), folderPath, fullName);
    await fs.writeFile(dir, await file.bytes());

    imageList[fullName] = setTimeout(() => {
        fs.unlink(dir);
        delete imageList[fullName];
    }, expireTime * 1000);
    
    return fullName;
}

(async function() {
    const dir = path.join(path.resolve(), folderPath);
    console.log("starting clear...", dir);

    const files = await fs.readdir(dir);
    files.forEach(v => fs.unlink(path.join(dir, v)));
})();