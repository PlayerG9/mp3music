import { useQuery } from "react-query"
import { fetchVideoMetadata } from "../../apiCommunication"
import { sendNotification } from '../../Components/notification'
import { StepWidgetProps } from "../typescriptData"
import useFocus from "../../hooks/useFocus"
import YoutubeMetadataRenderer from "../components/YoutubeMetadataRenderer"


export default function YoutubeIdInput(props: StepWidgetProps) {
    const youtubeId = props.values.youtubeId
    const isValidId = (youtubeId !== undefined && youtubeId.length > 10)

    const apiCall = useQuery(
        ['video-metadata'],
        () => fetchVideoMetadata(youtubeId ?? ""),
        {
            refetchInterval: 1,
            enabled: isValidId
        }
    )

    useFocus(() => {
        if((apiCall.isError || !isValidId) && navigator.clipboard.readText){
            navigator.clipboard.readText()
                .then((text) => props.handleInput("youtubeId", text))
                .catch(() => sendNotification("failed to load youtubeId"))
        }
    })

    function nextStep(){
        if(!apiCall.data){
            sendNotification("Invalid Youtube Id")
            return
        }else{
            props.handleInput("title", apiCall.data.title)
            props.handleInput("artist", apiCall.data.artist)
            props.nextStep()
        }
    }

    return <div className="youtubeid-input">
        <input value={props.values.youtubeId ?? ""} onInput={props.handleInput("youtubeId")} autoFocus={true} />
        <button onClick={nextStep} disabled={!apiCall.isSuccess}>Select</button>
        {apiCall.isLoading && <p>Verifying...</p>}
        {apiCall.isError && <p>Invalid</p>}
        {apiCall.isSuccess && <YoutubeMetadataRenderer {...apiCall.data} />}
    </div>
}
