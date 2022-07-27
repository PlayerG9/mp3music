export const SERVERADDRESS = 'mp3music-backend.herokuapp.com'


export function getAudioDownloadLink(uid: string){
    return `https://${SERVERADDRESS}/api/mp3file/${uid}`
}
