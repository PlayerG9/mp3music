import { ReactElement, useEffect, useState } from "react"
import ReactDOM from 'react-dom'

type notification = string | ReactElement | null

const notificationsList: notification[] = []

const notificationRoot = document.getElementById('notifications');


export function NotificationsDisplay(){
    const [currentMessage, setMessage] = useState<notification>(null)
    const [counterValue, setCounterValue] = useState(0)

    function timedUpdate(){
        if(!currentMessage){
            const nextMessage = notificationsList.shift()
            if(nextMessage){
                setCounterValue(0)
                setMessage(nextMessage)
            }
        }else{
            if(counterValue >= 50){
                setMessage(null)
            }else{
                setCounterValue(counterValue + 1)
            }
        }
    }

    useEffect(() => {
        const intervalId = setInterval(timedUpdate, 100)

        return () => clearInterval(intervalId)
    })

    if(!currentMessage || !notificationRoot){
        return null
    }

    return ReactDOM.createPortal(
        <div className="notification-message">
            {currentMessage}
        </div>,
        notificationRoot
    )
}


export function sendNotification(message: notification){
    console.log("New Message", message)
    notificationsList.push(message)
}
