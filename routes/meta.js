const express = require('express');
const router = express.Router();
const {getInfo} = require(`../libraries/downloader`)
/* GET users listing. */
router.get('/', async (req, res, next) => {
    try {
        console.log(req)
        const {url} = req.query
        console.log(url)
        const meta = await getInfo(url)
        console.log(meta)
        res.json(meta)
    }
    catch (e) {
       res.json({error: e})
    }
});

module.exports = router;