import './style.scss'
import './Components/style.scss'
import { NotificationsDisplay } from './Components/notification'
import DownloadInterface from './DownloadInterface'
import ApiWakeUp from './ApiWakeUp'


export default function App() {
	return <div className='app'>
		<h1>mp3music</h1>
		<DownloadInterface/>
		<NotificationsDisplay/>
		<ApiWakeUp/>
	</div>
}
