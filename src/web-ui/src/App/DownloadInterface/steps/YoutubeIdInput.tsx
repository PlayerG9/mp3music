import { useQuery } from "react-query"
import { fetchVideoMetadata } from "../../apiCommunication"
import { sendNotification } from '../../Components/notification'
import { StepWidgetProps } from "../typescriptData"


export default function YoutubeIdInput(props: StepWidgetProps) {
    const youtubeId = props.values.youtubeId

    const apiCall = useQuery(
        ['video-metadata'],
        () => fetchVideoMetadata(youtubeId ?? ""),
        {
            cacheTime: 1,
            enabled: (youtubeId !== undefined && youtubeId.length > 10)
        }
    )

    function nextStep(){
        if(!apiCall.data){
            sendNotification("Invalid Youtube Id")
            return
        }else{
            props.handleInput("title")(apiCall.data.title)
            props.handleInput("artist")(apiCall.data.artist)
            props.nextStep()
        }
    }

    return <>
        <input value={props.values.youtubeId ?? ""} onInput={props.handleInput("youtubeId")} />
        <button onClick={nextStep} disabled={!apiCall.isSuccess}>Select</button>
        {apiCall.isLoading && <p>Verifying...</p>}
        <div>{apiCall.data?.title}</div>
    </>
}
