import './style.scss'
import { registerRoute } from '../../routeManager'
import { Link, Route } from 'react-router-dom'


export default function HomePage(){
    return <div className='app homepage'>
        <h1>mp3-music</h1>
        <p>a tool to download or edit mp3 files</p>
        <div className='applications'>
            <Link to="/download">download mp3 file</Link>
            <Link to="/lyrics">search for lyrics</Link>
            <Link to="/mp3edit">edit mp3-file metadata</Link>
            <Link to="/search">search for videos</Link>
        </div>
    </div>
}

registerRoute(<Route key="home" index element={<HomePage/>}/>)
