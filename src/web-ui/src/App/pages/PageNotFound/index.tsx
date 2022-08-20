import './style.scss'
import { Route } from 'react-router-dom'
import { registerRoute } from '../../routeManager'


export default function PageNotFound(){
    return <div className='app page-not-found'>
        <h1>Page not Found</h1>
    </div>
}

registerRoute(
	<Route key="not-found" path="*" element={<PageNotFound/>}/>
)
