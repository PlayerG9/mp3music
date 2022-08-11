import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useNavigate } from 'react-router-dom'
import { DownloadProtocolMessage } from "../typescriptData"
import { getDownloadWebsocketUrl } from "../../../apiCommunication"
import { sendNotification } from '../../../Components/notification'
import Loader from '../../../Components/Loader'
import MessageRenderer from '../components/MessageRenderer'
import { useState } from 'react'
import { makeUrlDataWrapper, buildRedirect } from '../utility'


export default makeUrlDataWrapper(DownloadUpdates, ["youtubeId", "title", "artist"])


interface DUProps {
    youtubeId: string,
    title: string,
    artist: string
}


export function DownloadUpdates(props: DUProps) {
    const websocket = useWebSocket(getDownloadWebsocketUrl, {
        onOpen: onOpen,
        onMessage: onMessage,
        onError: onError,
        onClose: (event) => {
            console.log(event);
            navigate(buildRedirect("/download/mp3file", 
                { fileUid, filename, messages, failed: !event.wasClean }
            ))
        }
    })
    const navigate = useNavigate()
    const [fileUid, setFileUid] = useState("")
    const [filename, setFilename] = useState("")
    const [messages, setMessages] = useState<DownloadProtocolMessage[]>([])

    function onOpen(_: any){
        websocket.sendJsonMessage({
            youtubeId: props.youtubeId,
            metadata: {
                title: props.title,
                artist: props.artist
            }
        })
    }

    function onMessage(event: any){
        const data: DownloadProtocolMessage = JSON.parse(event.data)
        if(data.final){
            setFileUid(data.final.uid)
            setFilename(data.final.filename)
        }else{
            setMessages((prevMessages) => {
                const lastIndex = prevMessages.length - 1
                if(data.progress && prevMessages[lastIndex]?.progress){
                    prevMessages[lastIndex] = data  // update last
                    return prevMessages
                }else{
                    console.log(data)
                    return prevMessages.concat(data)
                }
            })
        }
    }

    function onError(){
        sendNotification("Error occured")
    }

    switch(websocket.readyState){
        case ReadyState.CONNECTING:
            return <Loader/>
        case ReadyState.OPEN:
            return <div>
                {messages.map((message, key) => <MessageRenderer key={key} {...message}/>)}
            </div>
        default:
            return <div>
                Bad State: {websocket.readyState}
                <br/>
                {JSON.stringify(props)}
            </div>
    }
}
