import { Link } from "react-router-dom"
import appIcon from './app-icon.png'


export default function AppHeader(){
    return <div className="app-header">
        <Link className="homepage-link" to="/">
            <img src={appIcon} alt="" />
            {/* <div>mp3-music</div> */}
        </Link>
    </div> 
}