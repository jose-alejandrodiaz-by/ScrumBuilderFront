import { useRouter } from "next/router";
import Project from "../../../components/Project";
import testproject from '../../../../testingResources/projectObject'
import { useGetProject } from "../../../hooks/projects";

export default function Page(){
    const router = useRouter();
    const { project, loading, error:{isError, errorMessage}} = useGetProject(router.query.pageId)
    return (
        <div>
            {loading ? <h1>Loading...</h1> :
             isError ? <h1>{errorMessage}</h1> : 
            <>
                {project.id ? project.project_name:"nothing" }
                <Project project={project.project_name ? project : testproject} />
            </> 
            }
        </div>
    )

}