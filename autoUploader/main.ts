import { createBrowser } from './modules/browser.ts';
import dotenv from 'dotenv';
import fs from 'fs';
import { AssetFileItem } from './modules/asset.ts';
import { uploadStart } from './modules/starter.ts';

dotenv.config();

const assets = JSON.parse(fs.readFileSync("./assets.json", { encoding: "utf-8" })) as AssetFileItem[];
const BATCH_AMOUNT = Number(process.env.BATCH_AMOUNT) || 3;

// console.log("브라우저 생성중...");
// createBrowser().then(init);

async function init() {
    // console.log("브라우저 생성 완료!");

    const maxPage = Math.ceil(assets.length / BATCH_AMOUNT);

    for (let i = 0; i < maxPage; i++) {
        const startIdx = i * BATCH_AMOUNT;
        const endIdx = Math.min(assets.length, startIdx + BATCH_AMOUNT);

        console.log(`${assets[startIdx].id} (${startIdx}) ~ ${assets[endIdx - 1].id} (${endIdx - 1}) 시작.`);

        const rangeList = assets.slice(startIdx, endIdx);
        const processList = rangeList.map(item => uploadStart(item));

        await Promise.all(processList);

        console.log("배치 처리 완료.");
    }
}

init();