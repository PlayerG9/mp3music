import { useEffect } from "react"

type Callback = () => void


export default function useFocus(callback: Callback){
    useEffect(() => {
        callback()  // call it once on load
        window.addEventListener("focusin", callback)  // and on revisiting the page
        return () => window.removeEventListener("focusin", callback)
    })
}
