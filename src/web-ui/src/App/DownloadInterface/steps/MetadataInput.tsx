import { useQuery } from 'react-query'
import { fetchVideoMetadata } from '../../apiCommunication'
import Loader from '../../Components/Loader'
import { StepWidgetProps } from "../typescriptData"


export default function MetadataInput(props: StepWidgetProps) {
    if(!props.values.youtubeId){
        return <p>Somthing must went wrong</p>
    }
    return <>
        <div>
            <span>Title</span>
            <input onInput={props.handleInput("title")} value={props.values.title}/>
        </div>
        <div>
            <span>Artist</span>
            <input onInput={props.handleInput("artist")} value={props.values.artist}/>
        </div>
        <button onClick={props.nextStep}>Next</button>
        <ShowYoutubeMetadata youtubeId={props.values.youtubeId}/>
    </>
}


function ShowYoutubeMetadata(props: {youtubeId: string}){
    const apiCall = useQuery(['video-metadata'], () => fetchVideoMetadata(props.youtubeId))

    if(apiCall.isLoading){
        return <Loader/>
    }
    if(apiCall.isError){
        return <p>Error</p>
    }

    const data = apiCall.data

    return <div>
        <img src={data?.thumbnail_url} alt="thumbnail" />
        <p>{data?.artist} - {data?.title}</p>
        <p>Views: {data?.views}</p>
    </div>
}
