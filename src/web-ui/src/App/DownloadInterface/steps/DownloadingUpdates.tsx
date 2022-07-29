import { ReactElement, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { StepWidgetProps } from "../typescriptData"
import { getDownloadWebsocketUrl } from "../../apiCommunication"
import Loader from '../../Components/Loader'
import { sendNotification } from '../../Components/notification'


export default function DownloadUpdates(props: StepWidgetProps) {
    const websocket = useWebSocket(getDownloadWebsocketUrl, {
        onOpen: onOpen,
        onMessage: onMessage,
        onError: onError
    })
    const [messages, setMessages] = useState<ReactElement[]>([])

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
        const data = JSON.parse(event.data)
        console.log("onMessage", data)
        if(data.final){
            props.handleInput("fileUid")(data.final.uid)
            props.handleInput("filename")(data.final.filename)
            props.nextStep()
        }
        else if(data.info){
            setMessages(messages.concat(<>INFO: {data.info}</>))
        }else if(data.warning){
            setMessages(messages.concat(<>WARN: {data.warning}</>))
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
                {messages.map((message, index) => <div key={index}>
                    {message}
                </div>)}
            </div>
        default:
            return <div>
                Bad State: {websocket.readyState}
                <br/>
                {JSON.stringify(props)}
            </div>
    }
}
