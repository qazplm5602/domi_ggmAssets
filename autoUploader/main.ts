import { createBrowser } from './modules/browser.ts';
import dotenv from 'dotenv';

dotenv.config();

console.log("브라우저 생성중...");
createBrowser().then(init);

function init() {
    console.log("브라우저 생성 완료!");

    
}