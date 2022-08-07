import { useState } from "react"
import { getAudioDownloadLink } from "../../../apiCommunication"
import MessageRenderer from "../components/MessageRenderer"
import { DownloadProtocolMessage } from '../typescriptData'
import { makeParamsWrapper } from "../utility"


export default makeParamsWrapper(AudioDownload, ["fileUid", "filename", "messages"])


interface audioDownloadProps {
    fileUid: string,
    filename: string,
    messages: DownloadProtocolMessage[]
}


export function AudioDownload(props: audioDownloadProps) {
    const { fileUid, messages } = props
    const [filename, setFilename] = useState(props.filename)

    const downloadUrl = getAudioDownloadLink(fileUid, filename)
    
    return <div className="audio-download">
        <input value={filename} onInput={(e: any) => setFilename(e.target.value)} autoFocus={true} />
        <a className="next-link" href={downloadUrl} target='_blank' rel="noreferrer">Download Audio</a>
        <div className="seperator"/>
        <div>
            {messages.map((message, key) => <MessageRenderer key={key} {...message}/>)}
        </div>
    </div>
}
