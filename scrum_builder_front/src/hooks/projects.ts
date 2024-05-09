import { useEffect, useState } from "react";
import { getAllProjects, getProject, postProject } from "../Services/ProjectsServices";
import { Project } from "../types/Projects";

export function useGetAllProjects() {
    const [projects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({
        "isError": false,
        "errorMessage": ""
    });

    useEffect(() => {
        getAllProjects()
            .then((res) => {
                setAllProjects(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                setError({ "isError": true, "errorMessage": err.message })
            })
    }, [])

    return { projects, loading, error }
}


export function useGetProject(id: string | string[]) {
    const [project, setProject] = useState(null); // change to actual type later. 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({
        "isError": false,
        "errorMessage": ""
    });

    useEffect(() => {
        getProject(id)
            .then((res) => {
                setProject(res)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                setError({ "isError": true, "errorMessage": err.message })
            })
    }, [id])

    return { project, loading, error }
}

//export function usePostProject(data:Array<Project>){
export function usePostProject() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({
        "isError": false,
        "errorMessage": ""
    });
    const handleSubmit = (data: Array<Project>) => {
        postProject(data)
            .then(() => {
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setError({
                    "isError": true,
                    "errorMessage": err.message
                })
            })
    };

    return { handleSubmit, loading, error }
}