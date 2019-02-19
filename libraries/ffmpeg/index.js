const ffmpeg = require(`fluent-ffmpeg`)

const getDurationFromStream = async ({url}) => {
    try {
        return new Promise((resolve, reject) => {
            let proc = ffmpeg()
            proc.addInput(url)
                .ffprobe((e, data) => {
                    if (e) {
                        reject(e)
                    }
                    if(data){
                        resolve(data.streams[0].duration)
                    }
                    else{
                        reject(`no data`)
                    }

                })
        })
    }
    catch (e) {
        console.error(e)
        throw `Failed to get duration ${e}`
    }
}

const getMetaData = async ({url}) => {
    try {
        return new Promise((resolve, reject) => {
            let proc = ffmpeg()
            proc.addInput(url)
                .ffprobe((e, data) => {
                    if (e) {
                        reject(e)
                    }
                    if(data){
                        resolve(data)
                    }
                    else{
                        reject(`no data`)
                    }

                })
        })
    }
    catch (e) {
        console.error(e)
        throw `Failed to get duration ${e}`
    }
}
module.exports = {
    getDurationFromStream,
    getMetaData
}