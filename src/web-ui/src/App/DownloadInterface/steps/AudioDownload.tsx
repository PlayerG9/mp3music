import { StepWidgetProps } from "../typescriptData"
import { getAudioDownloadLink } from "../../apiCommunication"


export default function AudioDownload(props: StepWidgetProps) {
    const { fileUid } = props.values
    if(!fileUid){
        return <span>Download</span>
    }
    const downloadUrl = getAudioDownloadLink(fileUid, props.values.filename)
    return <>
        <a href={downloadUrl}>
            Download
        </a>
    </>
}
