import { StepWidgetProps } from "../typescriptData"
import { getAudioDownloadLink } from "../../apiCommunication"


export default function AudioDownload(props: StepWidgetProps) {
    const { fileUid, filename } = props.values
    if(!fileUid){
        return <p>Somthing went wrong</p>
    }
    const downloadUrl = getAudioDownloadLink(fileUid, filename)
    console.log({fileUid, filename, downloadUrl})
    return <div>
        <input value={filename} onInput={props.handleInput("filename")} />
        <p>
            <a href={downloadUrl}>Download</a>
        </p>
    </div>
}
