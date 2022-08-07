import { useSearchParams } from "react-router-dom"


export default function useUrlData<T>(): T | any {
    const [searchParams] = useSearchParams()
    const data = searchParams.get('data')

    if(!data) return {}
    return JSON.parse(data)
}
