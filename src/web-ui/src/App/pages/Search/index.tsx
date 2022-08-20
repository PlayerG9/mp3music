import './style.scss'
import { Route, Link, useSearchParams } from 'react-router-dom'
import { registerRoute } from '../../routeManager'
import { useEffect, useState } from 'react'
import { buildUrl } from '../../apiCommunication'
import { VideoSearchItem } from '../../apiCommunication/types'
import { buildRedirect } from '../DownloadInterface/utility'


export default function Search(){
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get('query') ?? ""
    const [results, setResults] = useState<VideoSearchItem[]>([])
    const [isLoading, setLoading] = useState(false)

    function onChange(event: any){
        setSearchParams({query: event.target.value})
    }

    function onKeyDown(event: any){
        if(event.key === 'Enter' && !isLoading){
            doSearch()
        }
    }

    useEffect(() => {
        if(query.length <= 4) return

        const timeoutId = setTimeout(() => doSearch(), 1000)
        return () => clearTimeout(timeoutId)
    }, [query])

    function doSearch(){
        console.log("make Search")
        if(isLoading) return

        setLoading(true)
        const url = buildUrl('/api/search', {
            query: query,
            limit: 12
        })
        fetch(url)
            .then((response) => {
                response.json().then((data: {result: VideoSearchItem[]}) =>
                    setResults(data.result)
                )
            })
            .catch(() => setResults([]))
            .finally(() => setLoading(false))
    }

    // if(query.length >= 4 && !results.length && !isLoading){
    //     doSearch()
    // }

    return <div className='search app'>
        <div className='query-form'>
            <input onChange={onChange} onKeyDown={onKeyDown} value={query} autoFocus/>
        </div>
        <div className='seperator'/>
        <div className='results'>
            {results.map((video, key) => 
                <ResultItem key={key} {...video}/>
            )}
        </div>
    </div>
}


export function ResultItem(props: VideoSearchItem){
    const target = buildRedirect('/download/datainput', {
        youtubeId: props.id,
        title: props.title,
        artist: props.channel.name
    })
    return <Link to={target} className='result-item'>
        <p className='title'>
            {props.title}
        </p>
        <img className='image' src={props.thumbnails[0]?.url} alt=""/>
    </Link>
}


registerRoute(
    <Route key="search" path="search" element={<Search/>}/>
)
