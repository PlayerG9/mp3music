import { DownloadProtocolMessage } from "../typescriptData"


export default function MessageRenderer(msg: DownloadProtocolMessage){
    if(msg.info){
        return <div className='info'>
            {msg.info}
        </div>
    }else if(msg.warning){
        return <div className='warning'>
            {msg.warning}
        </div>
    }else if(msg.error){
        return <div className='error'>
            {msg.error_class}: {msg.error}
        </div>
    }else{
        return <>
            {JSON.stringify(msg)}
        </>
    }
}
