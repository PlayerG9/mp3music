import { useQuery } from "react-query"
import { helloWorld } from "./apiCommunication"
import { sendNotification } from "./Components/notification"

export default function ApiWakeUp(){
    const apiCall = useQuery(['hello-world'], helloWorld, {
        retry: false
    })

    if(apiCall.isError){
        sendNotification("Server seems down")
    }

    return null
}
