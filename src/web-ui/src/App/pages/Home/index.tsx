import './style.scss'
import { registerRoute } from '../../routeManager'
import { Route } from 'react-router-dom'


export default function HomePage(){
    return <div className='app'>
        <h1>Hello World</h1>
    </div>
}

registerRoute(<Route key="home" index element={<HomePage/>}/>)
