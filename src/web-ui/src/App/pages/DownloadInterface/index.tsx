import './components/style.scss'
import { Route, Outlet } from "react-router-dom"
import { registerRoute } from "../../routeManager"
import AudioDownload from "./steps/AudioDownload"
import DownloadUpdates from "./steps/DownloadingUpdates"
import MetadataInput from "./steps/MetadataInput"
import YoutubeIdInput from "./steps/YoutubeIdInput"


function DownloadInterfaceElement(){
    return <div className="app download-interface">
        <Outlet/>
    </div>
}


registerRoute(<Route key="download" path="download" element={<DownloadInterfaceElement/>}>
    <Route index element={<YoutubeIdInput/>}/>
    <Route path="datainput" element={<MetadataInput/>}/>
    <Route path="updates" element={<DownloadUpdates/>}/>
    <Route path="mp3file" element={<AudioDownload/>}/>
</Route>)
