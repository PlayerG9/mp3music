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
            props.nextStep()
        }
    }

    return <>
        <input value={props.values.youtubeId ?? ""} onInput={props.handleInput("youtubeId")} />
        <button onClick={nextStep}>Select</button>
        <div>{JSON.stringify(apiCall.data)}</div>
    </>
}
