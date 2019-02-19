const downloader = require(`youtube-dl`)
const Promise = require(`bluebird`)
const getInfo = Promise.promisify(downloader.getInfo)

module.exports = {
    getInfo,
}