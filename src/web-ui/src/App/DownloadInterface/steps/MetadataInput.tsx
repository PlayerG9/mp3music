import { useQuery } from 'react-query'
import Loader from '../../Components/Loader'
import { StepWidgetProps } from "../typescriptData"


export default function MetadataInput(props: StepWidgetProps) {
    if(!props.values.youtubeId){
        return <p>Somthing must went wrong</p>
    }
    return <>
        <button onClick={props.nextStep}>Next</button>
        <ShowYoutubeMetadata youtubeId={props.values.youtubeId}/>
    </>
}


function ShowYoutubeMetadata(props: {youtubeId: string}){
    const apiCall = useQuery(['video-metadata'], )

    if(apiCall.isLoading){
        return <Loader/>
    }

    return <>
        {JSON.stringify(apiCall.data)}
    </>
}
