import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const GetProject = () => {

    const [id, setId] = useState('');
    const getData = async (e) => {
        e.preventDefault();
    }
    return (
        <form className="flex flex-col items-center justify-center" onSubmit={getData}>
          <label>
            ID
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" value={id} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" disabled='hello'>
          Get
          </button>
        </form>
      );
};
export default GetProject;