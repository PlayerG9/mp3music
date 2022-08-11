import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { fetchVideoMetadata } from '../../../apiCommunication'
import Loader from '../../../Components/Loader'
import useUrlData from '../../../hooks/useUrlData'
import YoutubeMetadataRenderer from '../components/YoutubeMetadataRenderer'
import { buildRedirect, makeUrlDataWrapper } from '../utility'


export default makeUrlDataWrapper(MetadataInput, ["youtubeId", "title", "artist"])


interface metadataInputProps {
    youtubeId: string,
    title: string,
    artist: string
}


export function MetadataInput(props: metadataInputProps) {
    const { youtubeId } = props
    console.log([youtubeId])
    const [title, setTitle] = useState(props.title)
    const [artist, setArtist] = useState(props.artist)

    const urlParams = {
        youtubeId: youtubeId,
        title: title,
        artist: artist
    }

    return <div className='metadata-input'>
        <table className='input-fields'>
            <tbody>
                <tr>
                    <td>Title</td>
                    <td>
                        <input onInput={(e: any) => setTitle(e.target.value)} value={title}/>
                    </td>
                </tr>
                <tr>
                    <td>Artist</td>
                    <td>
                        <input onInput={(e: any) => setArtist(e.target.value)} value={artist}/>
                    </td>
                </tr>
            </tbody>
        </table>
            <div className='input'>
            </div>
        <Link className='next-link' to={buildRedirect("/download/updates", urlParams)}>Start Download</Link>
        <ShowYoutubeMetadata/>
    </div>
}


function ShowYoutubeMetadata(){
    const urlData = useUrlData<{youtubeId: string}>()
    const youtubeId = urlData.youtubeId
    const apiCall = useQuery(
        ['video-metadata'],
        () => fetchVideoMetadata(youtubeId),
        {enabled: !!youtubeId}
    )

    if(apiCall.isLoading){
        return <Loader/>
    }
    if(!apiCall.isSuccess){
        return null
    }

    return <YoutubeMetadataRenderer {...apiCall.data} />
}
