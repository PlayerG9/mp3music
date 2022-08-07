import { VideoMetadata } from "./types"

export const SERVERADDRESS = 'mp3music-backend.herokuapp.com'


export function getAudioDownloadLink(uid: string, filename?: string){
    const url = new URL(`https://${SERVERADDRESS}/api/mp3file/${uid}`)
    if(filename){
        url.searchParams.append("filename", filename)
    }
    return url.toString()
}

export function getDownloadWebsocketUrl(){
    return `wss://${SERVERADDRESS}/api/download`
}

function makeRequest(method: string, endpoint: string, data: object){
    const url = new URL(endpoint)
    for(let [key, value] of Object.entries(data)){
        url.searchParams.append(key, value)
    }
    return fetch(url, {
        method: method
    })
}

const makeGet = (url: string, body: object) => makeRequest("GET", url, body)


export async function fetchVideoMetadata(youtubeId: string): Promise<VideoMetadata> {
    const url = `https://${SERVERADDRESS}/api/metadata`
    const response = await makeGet(url, {
        youtubeId: youtubeId
    })

    if(!response.ok){
        throw new Error("" + response.status)
    }

    const data = await response.json()
    return data
}


export async function helloWorld() {
    const url = `https://${SERVERADDRESS}/api/`
    const response = await makeGet(url, {})

    if(!response.ok){
        throw new Error("" + response.status)
    }

    await response.json()  // don't save and data, only try to decode
}
