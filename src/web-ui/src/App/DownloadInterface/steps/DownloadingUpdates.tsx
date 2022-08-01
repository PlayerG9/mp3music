import { useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { DownloadProtocolMessage, StepWidgetProps } from "../typescriptData"
import { getDownloadWebsocketUrl } from "../../apiCommunication"
import { sendNotification } from '../../Components/notification'
import Loader from '../../Components/Loader'
import MessageRenderer from '../components/MessageRenderer'


export default function DownloadUpdates(props: StepWidgetProps) {
    const websocket = useWebSocket(getDownloadWebsocketUrl, {
        onOpen: onOpen,
        onMessage: onMessage,
        onError: onError,
        onClose: () => props.nextStep()
    })
    const [messages, setMessages] = useState<DownloadProtocolMessage[]>([])

    function onOpen(event: any){
        console.log("onOpen", event)
        websocket.sendJsonMessage({
            youtubeId: props.values.youtubeId,
            metadata: {
                title: props.values.title,
                artist: props.values.artist
            }
        })
    }

    function onMessage(event: any){
        const data: DownloadProtocolMessage = JSON.parse(event.data)
        console.log("onMessage", data)
        if(data.final){
            props.handleInput("fileUid")(data.final.uid)
            props.handleInput("filename")(data.final.filename)
            props.nextStep()
        }
        const lastIndex = messages.length - 1
        if(data.progress && messages[lastIndex]?.progress){
            messages[lastIndex] = data  // update last
            setMessages(
                messages
            )
        }else{
            setMessages(
                messages.concat(data)
            )
        }
    }

    function onError(event: any){
        console.log("onError", event)
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
