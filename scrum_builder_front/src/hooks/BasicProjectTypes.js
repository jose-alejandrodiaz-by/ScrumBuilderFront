import { useEffect, useState } from "react";
import { getBasicProjectTypes } from "../Services/ProjectsServices";

export function useGetBasicProjectTypes() {
    const [projectTypes, setBasicProjectTypes] = useState([]);
    const [loading_pro, setLoading] = useState(true);
    const [error_pro, setError] = useState({
        isError: false,
        errorMessage: ""
    });

    useEffect(() => {
        getBasicProjectTypes()
            .then((res) => {
                setBasicProjectTypes(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError({ isError: true, errorMessage: err.message });
            });
    }, []);

    return { projectTypes, loading_pro, error_pro };
}
