import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProjectsServices from '../Services/ProjectsServices'; // import the service
import Project from './Project';
import  testproject from '../../testingResources/projectObject'

const GetProject = () => {
    const [id, setId] = useState('');
    const router = useRouter();
    const [info, setInfo] = useState(testproject);

    const getData = async (e) => {
        e.preventDefault();
        try {
            const data = await ProjectsServices.getProject(id); // use the service to get the data
            console.log(data); // log the data or do something with it
            setInfo(data);
        } catch (error) {
            console.error(error); // handle the error
        }
    }

    

    return (
        <div>
        <form className="flex flex-col items-center justify-center" onSubmit={getData}>
            <label>
                ID
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    type="text" 
                    value={id} 
                    onChange={(e) => setId(e.target.value)} // change setUsername to setId
                />
            </label>
            <br />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                Get
            </button>
        </form>

        {info.id ? info.project_name:"nothing" }
        <Project project={info.project_name ? info : testproject} />
        </div>

    );
};

export default GetProject;
