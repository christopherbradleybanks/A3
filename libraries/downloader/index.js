const downloader = require(`youtube-dl`)
const fs = require(`fs`)
const path = require(`path`)
const Promise = require(`bluebird`)
const {getDurationFromStream} = require(`../ffmpeg`)

const downloadFile = async ({url, localDir = __dirname + `/videos`, downloadTo}) => {
    return await new Promise((resolve, reject) => {
        const video = downloader(url, [
            `--no-cache-dir`,
            `-f`,
            `mp4/best`,
        ], {
            cwd: localDir,
            maxBuffer: Infinity
        })

        let videoInfo = {}

        // Will be called when the download starts.
        video.on(`info`, (info) => {
            videoInfo = info
            console.log(`Download started`)
            console.log(`filename: ` + info._filename)
            console.log(`size: ` + info.size)
        })

        video.pipe(fs.createWriteStream(downloadTo).on(`close`, () => {
            console.log(`stream closed`)
        }))

        // Will be called if download was already completed and there is nothing more to download.
        video.on(`complete`, function complete(info) {
            console.log(`filename: ` + info._filename + ` already downloaded.`)
            videoInfo.filePath = filePath
        })

        video.on(`error`, (err) => {
            console.log(`error on download!`, err)
            return reject({
                errorType: `downloadError`
            })
        })
        video.on(`end`, () => {
            console.log(`finished downloading!`)
            return resolve(videoInfo)
        })
    })
}
const getInfo = Promise.promisify(downloader.getInfo)
const isDownloadable = async ({downloadFrom}) => {
    const info = await getInfo(downloadFrom)
    const {url, extractor,} = info
    console.log(info)
    if(extractor !== `youtube`){
        return false
    }
    else{
        const duration = await getDurationFromStream({url})
        if(duration > 300){
            return false
        }
    return true
    }
}

// isDownloadable({downloadFrom: `https://www.youtube.com/watch?v=O1M_iqSBEpA`}).then((downloadable) => {
//         console.log(`is downloadable ? `, downloadable)
//
//     })

module.exports = {
    downloadFile,
    getInfo,
    isDownloadable
}