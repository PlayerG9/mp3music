import { StepWidgetProps } from "../typescriptData"
import { getAudioDownloadLink } from "../../../apiCommunication"
import MessageRenderer from "../components/MessageRenderer"


export default function AudioDownload(props: StepWidgetProps) {
    const { fileUid, filename, messages } = props.values
    if(!fileUid){
        return <p>Somthing went wrong</p>
    }
    const downloadUrl = getAudioDownloadLink(fileUid, filename)
    
    return <div>
        <input value={filename} onInput={props.handleInput("filename")} autoFocus={true} />
        <p>
            <a href={downloadUrl}>Download</a>
        </p>
        <div>
            {messages.map((message, key) => <MessageRenderer key={key} {...message}/>)}
        </div>
    </div>
}
