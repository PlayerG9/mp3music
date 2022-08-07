import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { SERVERADDRESS } from "../../../apiCommunication"
import { VideoMetadata } from '../../../apiCommunication/types'
import { sendNotification } from '../../../Components/notification'
import useFocus from "../../../hooks/useFocus"
import YoutubeMetadataRenderer from "../components/YoutubeMetadataRenderer"
import { buildRedirect } from "../utility"


export default function YoutubeIdInput() {
    const [youtubeId, setYoutubeId] = useState("")
    const [videoFound, setVideoFound] = useState(false)
    const [response, setResponse] = useState<VideoMetadata | undefined>()
    
    const isValidId = (youtubeId !== null && youtubeId.length > 10)

    useEffect(() => {
        const timeoutId = setTimeout(
            async () => {
                if(!isValidId){
                    setVideoFound(false)
                    return
                }
        
                const url = new URL('/api/metadata', `https://${SERVERADDRESS}`)
                url.searchParams.append("youtubeId", youtubeId)
                const response = await fetch(url)
                if(!response.ok){
                    setVideoFound(false)
                    return
                }
                const data = await response.json()
        
                setResponse(data)
                setVideoFound(true)
            }, 300)
        return () => clearTimeout(timeoutId)
    }, [youtubeId, isValidId])

    useFocus(() => {
        if(!videoFound && navigator.clipboard.readText){
            navigator.clipboard.readText()
                .then((text) => setYoutubeId(text))
                .catch(() => sendNotification("failed to load Youtube-ID from clipboard"))
        }
    })

    const urlParams = {
        youtubeId: response?.video_id,
        title: response?.title,
        artist: response?.artist
    }

    return <div className="youtubeid-input">
        <input value={youtubeId ?? ""} onInput={(e: any) => setYoutubeId(e.target.value)} autoFocus={true} />
        {response !== undefined &&
            <Link className="next-link" to={buildRedirect("/download/datainput", urlParams)}>Select</Link>
        }
        {response !== undefined && <YoutubeMetadataRenderer {...response} />}
    </div>
}
