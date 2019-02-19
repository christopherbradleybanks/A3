const express = require('express');
const router = express.Router();
const {getMetaData} = require(`../libraries/ffmpeg`)
/* GET users listing. */
router.get('/', async (req, res, next) => {
    try {
        const {url} = req.query
        const meta = await getMetaData({url})
        res.status(200)
        res.json(meta)
    }
    catch (e) {
       res.json({error: e})
    }
});

module.exports = router;