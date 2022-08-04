import './style.scss'
import { registerRoute } from '../../routeManager'
import { Link, Route } from 'react-router-dom'


export default function HomePage(){
    return <div className='app homepage'>
        <h1>Hello World</h1>
        <div className='applications'>
            <Link to="/download">mp3 download</Link>
            <Link to="/lyrics">lyrics</Link>
            <Link to="/mp3edit">mp3 edit</Link>
            <Link to="/search">search</Link>
        </div>
    </div>
}

registerRoute(<Route key="home" index element={<HomePage/>}/>)
