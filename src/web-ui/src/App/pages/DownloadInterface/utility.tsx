import useUrlData from "../../hooks/useUrlData"


export function buildRedirect(path: string, data: object){
    const search = new URLSearchParams()
    search.append('data', JSON.stringify(data))
    return {
        pathname: path,
        search: `?${search.toString()}`
    }
}

export function makeUrlDataWrapper(Component: any, keys: string[]){
    
    return function DownloadUpdatesWrapper(){
        const urlData = useUrlData()
        for(let key of keys){
            if(urlData[key] === undefined){
                throw Error(`Missing key: '${key}'`)
            }
        }
        return <Component {...urlData}/>
    }
}
