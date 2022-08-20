export interface VideoMetadata {
    video_id: string,
    title: string,
    artist: string,
    description: string,
    channel_id: string,
    thumbnail_url: string,
    views: number
}


export interface VideoSearchItem {
    title: string,
    channel: {
        name: string
    },
    link: string,
    id: string,
    thumbnails: { url: string }[]
}
