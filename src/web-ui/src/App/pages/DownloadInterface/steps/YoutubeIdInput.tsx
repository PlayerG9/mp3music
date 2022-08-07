import { useState } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { fetchVideoMetadata } from "../../../apiCommunication"
import { sendNotification } from '../../../Components/notification'
import useFocus from "../../../hooks/useFocus"
import YoutubeMetadataRenderer from "../components/YoutubeMetadataRenderer"
import { buildRedirect } from "../utility"


export default function YoutubeIdInput() {
    const [youtubeId, setYoutubeId] = useState("")
    
    const isValidId = (youtubeId !== null && youtubeId.length > 10)
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
                .then((text) => setYoutubeId(text))
                .catch(() => sendNotification("failed to load youtubeId from clipboard"))
        }
    })

    const urlParams = {
        youtubeId: apiCall.data?.video_id,
        title: apiCall.data?.title,
        artist: apiCall.data?.artist
    }

    return <div className="youtubeid-input">
        <input value={youtubeId ?? ""} onInput={(e: any) => setYoutubeId(e.target.value)} autoFocus={true} />
        {apiCall.isSuccess ?
            <Link to={buildRedirect("/download/datainput", urlParams)}>Select</Link>
            :
            <span>Select</span>
        } 
        {apiCall.isLoading && <span>Verifying...</span>}
        {apiCall.isError && <span>Invalid</span>}
        {apiCall.isSuccess && <YoutubeMetadataRenderer {...apiCall.data} />}
    </div>
}
