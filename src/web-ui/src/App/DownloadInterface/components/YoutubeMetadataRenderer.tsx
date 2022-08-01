import { VideoMetadata } from "../../apiCommunication/types"


export default function YoutubeMetadataRenderer(data: VideoMetadata){
    return <div className="video-metadata">
        <p className="title">{data.title}</p>
        <img className="thumbnail" src={data.thumbnail_url} alt="" />
    </div>
}
