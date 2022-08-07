import './style.scss'
import './Components/style.scss'
import { Routes } from 'react-router-dom'
import { NotificationsDisplay } from './Components/notification'
import { buildRoutes } from './routeManager'
import ApiWakeUp from './ApiWakeUp'
import AppHeader from './Components/AppHeader'


// call pages to let them register themself for the Router
import './pages/Home'
import './pages/DownloadInterface'


export default function App() {
	return <>
		<AppHeader/>
		<Routes>
			{/* not as component because <Routes> only allow <Route> as child */}
			{buildRoutes()}
		</Routes>	
		{/* expluced from .app because they have different purposes */}
		<NotificationsDisplay/>
		<ApiWakeUp/>
	</>
}
