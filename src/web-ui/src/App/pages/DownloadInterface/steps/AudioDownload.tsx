import { useState } from "react"
import { getAudioDownloadLink } from "../../../apiCommunication"
import MessageRenderer from "../components/MessageRenderer"
import { DownloadProtocolMessage } from '../typescriptData'
import { makeUrlDataWrapper } from "../utility"


export default makeUrlDataWrapper(AudioDownload, ["fileUid", "filename", "messages", "failed"])


interface audioDownloadProps {
    fileUid: string,
    filename: string,
    messages: DownloadProtocolMessage[],
    failed: boolean
}


export function AudioDownload(props: audioDownloadProps) {
    const { failed } = props
    console.table(props)
    
    return <div className="audio-download">
        {!failed ? 
            <DownloadRenderer {...props}/>
            :
            <p>Unable to download audio</p>
        }
        <div className="seperator"/>
        <MessagesRenderer {...props}/> 
    </div>
}

function DownloadRenderer(props: audioDownloadProps){
    const [filename, setFilename] = useState(props.filename)

    const downloadUrl = getAudioDownloadLink(props.fileUid, filename)
    return <>
        <input value={filename} onInput={(e: any) => setFilename(e.target.value)} autoFocus={true} />
        <a className="next-link" href={downloadUrl} target='_blank' rel="noreferrer">Download Audio</a>
    </>
}

function MessagesRenderer(props: audioDownloadProps){
    const { messages } = props
    return <div>
        {messages.map((message, key) => <MessageRenderer key={key} {...message}/>)}
    </div>
}
