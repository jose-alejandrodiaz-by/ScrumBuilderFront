import { useEffect, useState } from "react";
import {getBasicPlatforms} from "../Services/ProjectsServices";

export function useGetBasicPlatforms(){
    const [platforms, setBasicPlatforms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({
        "isError":false,
        "errorMessage":""
    });

    useEffect(()=>{
        getBasicPlatforms()
        .then((res)=>{
            setBasicPlatforms(res.data)
            
            setLoading(false)
        })
        .catch((err)=>{
            setError({"isError":true, "errorMessage":err.message})
        })
    },[])

    return {platforms, loading, error}
}
