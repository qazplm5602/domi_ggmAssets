import express from 'express';
import bodyParser from 'body-parser';
import { getPlatformHandler } from './crawler.ts';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(bodyParser.text({type:"*/*"}));

app.post("/asset/:platform", async function(req, res) {
    const platform = req.params.platform;

    const callback = getPlatformHandler(platform);
    if (callback === undefined) {
        res.status(404).send('Not Found Platform');
        return;
    }

    const response = await callback(req);
    res.send(response);
});

app.listen(process.env.API_PORT, () => console.log(`${process.env.API_PORT} listen!`));