import { VideoMetadata } from "./types"

export const forceHeroku = true
export const isProduction = forceHeroku || process.env.NODE_ENV === 'production'
export const SERVERADDRESS = isProduction ? 
    'mp3music-backend.herokuapp.com' : '0.0.0.0:5000'
export const HTTPS = isProduction ? 'https' : "http"
export const WSS = isProduction ? 'wss' : 'ws'


export function getDownloadWebsocketUrl(){
    return `${WSS}://${SERVERADDRESS}/api/download`
}


export function buildUrl(endpoint: string, data?: object): string {
    const url = new URL(endpoint, `${HTTPS}://${SERVERADDRESS}`)
    if(data){
        for(let [key, value] of Object.entries(data)){
            url.searchParams.append(key, value)
        }
    }
    return url.toString()
}


export function getAudioDownloadLink(uid: string, filename?: string){
    const url = new URL(`${HTTPS}://${SERVERADDRESS}/api/mp3file/${uid}`)
    if(filename){
        url.searchParams.append("filename", filename)
    }
    return url.toString()
}


function makeRequest(method: string, endpoint: string, data: object){
    const url = buildUrl(endpoint, data)
    return fetch(url, {
        method: method
    })
}

const makeGet = (url: string, body: object) => makeRequest("GET", url, body)


export async function fetchVideoMetadata(youtubeId: string): Promise<VideoMetadata> {
    const url = `${HTTPS}://${SERVERADDRESS}/api/metadata`
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
    const url = `${HTTPS}://${SERVERADDRESS}/api/`
    const response = await makeGet(url, {})

    if(!response.ok){
        throw new Error("" + response.status)
    }

    await response.json()  // don't save and data, only try to decode
}
