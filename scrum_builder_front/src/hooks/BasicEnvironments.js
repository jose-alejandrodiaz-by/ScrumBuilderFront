import { useEffect, useState } from "react";
import {getBasicEnvironments} from "../Services/ProjectsServices";

export function useGetBasicEnvironments(){
    const [environments, setBasicEnvironments] = useState([]);
    const [loading_env, setLoading] = useState(true);
    const [error_env, setError] = useState({
        "isError":false,
        "errorMessage":""
    });

    useEffect(()=>{
        getBasicEnvironments()
        .then((res)=>{
            setBasicEnvironments(res.data)

            setLoading(false)
        })
        .catch((err)=>{
            setError({"isError":true, "errorMessage":err.message})
        })
    },[])

    return {environments, loading_env, error_env}
}
