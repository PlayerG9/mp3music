import { useQuery } from "react-query"
import { helloWorld } from "./apiCommunication"
import { sendNotification } from "./Components/notification"

export default function ApiWakeUp(){
    useQuery(['hello-world'], helloWorld, {
        retry: false,
        onSuccess: () => sendNotification("Server is available"),
        onError: () => sendNotification("Server seems down")
    })

    return null
}
