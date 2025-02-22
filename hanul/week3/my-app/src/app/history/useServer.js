import { useEffect, useState } from "react"
import axios from "axios"

const apiurl = "http://iubns.net:7000/?"

export default function useHistory(keys="hanul"){
    const [historyList, setHistoryList] = useState([])
    
    async function fecthHistory(){
        const {data} = await axios.get(apiurl, {
            params:{
                key:keys
            }
        })
        setHistoryList(data)
    }
    
    useEffect(()=>{
        fecthHistory()
    }, [])

    return {historyList}
}
