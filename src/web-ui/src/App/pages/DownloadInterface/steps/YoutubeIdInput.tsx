import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { HTTPS, SERVERADDRESS } from "../../../apiCommunication"
import { VideoMetadata } from '../../../apiCommunication/types'
import Loader from "../../../Components/Loader"
import { sendNotification } from '../../../Components/notification'
import useFocus from "../../../hooks/useFocus"
import YoutubeMetadataRenderer from "../components/YoutubeMetadataRenderer"
import { buildRedirect } from "../utility"


export default function YoutubeIdInput() {
    const [youtubeId, setYoutubeId] = useState("")
    const [videoFound, setVideoFound] = useState(false)
    const [response, setResponse] = useState<VideoMetadata | undefined>()
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    const isValidId = (youtubeId !== null && youtubeId.length > 10)

    useEffect(() => {
        const timeoutId = setTimeout(
            async () => {
                setLoading(true)
                try{
                    if(!isValidId){
                        setVideoFound(false)
                        return
                    }
            
                    const url = new URL('/api/metadata', `${HTTPS}://${SERVERADDRESS}`)
                    url.searchParams.append("youtubeId", youtubeId)
                    const response = await fetch(url)
                    if(!response.ok){
                        setVideoFound(false)
                        return
                    }
                    const data = await response.json()
            
                    setResponse(data)
                    setVideoFound(true)
                }finally{
                    setLoading(false)
                }
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

    function onInput(event: any){
        setYoutubeId(event.target.value)
    }

    function onKeyDown(event: any){
        if(event.key === 'Enter' && response !== undefined){
            navigate(linkTarget)
        }
    }

    const urlParams = {
        youtubeId: response?.video_id,
        title: response?.title,
        artist: response?.artist
    }
    const linkTarget = buildRedirect("/download/datainput", urlParams)

    return <div className="youtubeid-input">
        <input value={youtubeId ?? ""} onInput={onInput} onKeyDown={onKeyDown} autoFocus />
        {isLoading && <Loader/>}
        {response !== undefined &&
            <Link className="next-link" to={linkTarget}>Select</Link>
        }
        {response !== undefined && <YoutubeMetadataRenderer {...response} />}
    </div>
}
