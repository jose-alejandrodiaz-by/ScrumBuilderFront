import { useEffect, useState } from "react";
import {getAllTasks} from "../Services/ProjectsServices";


export function useGetAllTasks(){
    const [tasks, setAllTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({
        "isError":false,
        "errorMessage":""
    });

    useEffect(()=>{
        getAllTasks()
        .then((res)=>{
            setAllTasks(res.data)
            setLoading(false)
        })
        .catch((err)=>{
            setLoading(false)
            setError({"isError":true, "errorMessage":err.message})
        })
    },[])

    return {tasks, loading, error}
}