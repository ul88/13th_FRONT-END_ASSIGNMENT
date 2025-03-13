import {useEffect} from 'react'
import axios from "axios"

const apiurl = "http://iubns.net:7000/"

export default function deleteData(ids, keys){
    console.log("deleteData start: "+ids + " " + keys)
    async function deleteHistory(){
        await axios.delete(apiurl, {params:{
            id : ids,
            key : keys}
        })
    }

    deleteHistory()

    // useEffect(()=>{
    //     deleteHistory()
    // }, [])
}