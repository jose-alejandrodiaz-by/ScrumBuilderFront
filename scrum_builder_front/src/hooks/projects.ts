import { useEffect, useState } from "react";
import {getAllProjects, getProject} from "../Services/ProjectsServices";

export function useGetAllProjects(){
    const [projects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({
        "isError":false,
        "errorMessage":""
    });

    useEffect(()=>{
        getAllProjects()
        .then((res)=>{
            setAllProjects(res.data)
            setLoading(false)
        })
        .catch((err)=>{
            setError({"isError":true, "errorMessage":err.message})
        })
    },[])

    return {projects, loading, error}
}


export function useGetProject(id:string|string[]){
    const [project, setProject] = useState(null); // change to actual type later. 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({
        "isError":false,
        "errorMessage":""
    });

    useEffect(()=>{
        getProject(id)
        .then((res)=>{
            setProject(res.data)
            setLoading(false)
        })
        .catch((err)=>{
            setError({"isError":true, "errorMessage":err.message})
            console.error(err)
        })
    },[])

    return {project, loading, error}
}
