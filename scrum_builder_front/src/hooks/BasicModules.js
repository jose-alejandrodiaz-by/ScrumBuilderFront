import { useEffect, useState } from "react";
import {getBasicModules} from "../Services/ProjectsServices";

export function useGetBasicModules(){
    const [modules, setBasicModules] = useState([]);
    const [loading_mod, setLoading] = useState(true);
    const [error_mod, setError] = useState({
        "isError":false,
        "errorMessage":""
    });

    useEffect(()=>{
        getBasicModules()
        .then((res)=>{
            setBasicModules(res.data)
            
            setLoading(false)
        })
        .catch((err)=>{
            setError({"isError":true, "errorMessage":err.message})
        })
    },[])

    return {modules, loading_mod, error_mod}
}
