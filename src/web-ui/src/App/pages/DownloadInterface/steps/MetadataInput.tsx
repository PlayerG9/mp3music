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
    return <div className='metadata-input'>
        <RecommendedOptions {...props}/>
        <ManuelInput {...props}/>
        <ShowYoutubeMetadata/>
    </div>
}


function RecommendedOptions(props: metadataInputProps){
    const {a, b} = findTitleOptions(props.title, props.artist)
    const link1 = buildRedirect("/download/updates", {
        youtubeId: props.youtubeId,
        title: a,
        artist: b
    })
    const link2 = buildRedirect("/download/updates", {
        youtubeId: props.youtubeId,
        title: b,
        artist: a
    })
    return <div className='recommended'>
        {/* link2 is more likeable */}
        <Link to={link2}>
            <p className='title'>{b}</p>
            <p className='artist'>{a}</p>
        </Link>
        <Link to={link1}>
            <p className='title'>{a}</p>
            <p className='artist'>{b}</p>
        </Link>
    </div>
}


function ManuelInput(props: metadataInputProps){
    const { youtubeId } = props
        
    const [title, setTitle] = useState("")
    const [artist, setArtist] = useState("")

    const urlParams = {
        youtubeId: youtubeId,
        title: title,
        artist: artist
    }

    return <div className='manuel-input'>
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


function findTitleOptions(text: string, defaultValue: string) {
    text = removeBrackets(text)
    
    var [left, sep, right] = partition(text, '-')

    if(!sep){
        left = text
        right = defaultValue
    }
    
    left = removeNonUnicode(left ?? "")
    right = removeNonUnicode(right ?? "")
    return {a: left, b: right}
}


function partition(text: string, sep: string){
    const index = text.indexOf(sep)
    if(index === -1){
        return [text, null, null]
    }
    return [text.slice(0, index), sep, text.slice(index + 1)]
}


function removeBrackets(text: string): string {
    const regex = /\(.+\)|\[.+]/g
    return text.replaceAll(regex, "").trim()
}

function removeNonUnicode(text: string): string {
    const regex = /[^\w\- '!?]/g
    return text.replaceAll(regex, "").trim()
}
