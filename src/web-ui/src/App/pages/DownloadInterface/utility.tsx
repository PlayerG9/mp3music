import React from "react"
import { useSearchParams } from "react-router-dom"


export function buildRedirect(path: string, data: object){
    const search = new URLSearchParams()
    for(let [key, value] of Object.entries(data)){
        search.append(key, JSON.stringify(value))
    }
    return {
        pathname: path,
        search: `?${search.toString()}`
    }
}

export function makeParamsWrapper(component: any, keys: string[]){
    
    return function DownloadUpdatesWrapper(){
        const searchParams = useSearchParams()[0]
        const props: any = {}
        for(let key of keys){
            let value = searchParams.get(key)
            if(value === null) return <>Missing Param: {key}</>
            props[key] = JSON.parse(value)
        }
        return React.createElement(
            component,
            props

        )
    }
}
