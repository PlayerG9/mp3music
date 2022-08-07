import useUrlData from "../../hooks/useUrlData"


export function buildRedirect(path: string, data: object){
    const search = new URLSearchParams()
    search.append('data', JSON.stringify(data))
    return {
        pathname: path,
        search: `?${search.toString()}`
    }
}

export function makeParamsWrapper(Component: any, keys: string[]){
    
    return function DownloadUpdatesWrapper(){
        const urlData = useUrlData()
        const props: any = {}
        for(let key of keys){
            let value = urlData[key]
            if(value === null) return <>Missing Param: {key}</>
            props[key] = value
        }
        return <Component {...props}/>
    }
}
