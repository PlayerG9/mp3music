import { useQuery } from 'react-query'
import { fetchVideoMetadata } from '../../apiCommunication'
import Loader from '../../Components/Loader'
import YoutubeMetadataRenderer from '../components/YoutubeMetadataRenderer'
import { StepWidgetProps } from "../typescriptData"


export default function MetadataInput(props: StepWidgetProps) {
    if(!props.values.youtubeId){
        return <p>Somthing must went wrong</p>
    }
    return <div className='metadata-input'>
        <table className='input-fields'>
            <tbody>
                <tr>
                    <td>Title</td>
                    <td>
                        <input onInput={props.handleInput("title")} value={props.values.title}/>
                    </td>
                </tr>
                <tr>
                    <td>Artist</td>
                    <td>
                        <input onInput={props.handleInput("artist")} value={props.values.artist}/>
                    </td>
                </tr>
            </tbody>
        </table>
            <div className='input'>
            </div>
        <button onClick={props.nextStep}>
            Start Download
        </button>
        <ShowYoutubeMetadata youtubeId={props.values.youtubeId}/>
    </div>
}


function ShowYoutubeMetadata(props: {youtubeId: string}){
    const apiCall = useQuery(['video-metadata'], () => fetchVideoMetadata(props.youtubeId))

    if(apiCall.isLoading){
        return <Loader/>
    }
    if(!apiCall.isSuccess){
        return null
    }

    return <YoutubeMetadataRenderer {...apiCall.data} />
}
