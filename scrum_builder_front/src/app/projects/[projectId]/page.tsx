'use client'
import Project from "../../../components/Project";
import testproject from '../../../../testingResources/projectObject'
import { useGetProject } from "../../../hooks/projects";
import { useParams } from "next/navigation";
import NavBar from "../../../components/NavBar";
import { AuthProvider } from "../../../context/AuthContext";

export default function Page(){
    const params = useParams();
    const { project, loading, error:{isError, errorMessage}} = useGetProject(params.projectId)
    console.log(project)
    console.log(loading)
    return (
        <AuthProvider>
            <NavBar isLoggedIn={undefined}/>
                {loading ? <h1>Loading...</h1> :
                isError ? <h1>{errorMessage}</h1> : 
                <Project project={project.project_name ? project : testproject} /> 
                } 
        </AuthProvider>
    )

}