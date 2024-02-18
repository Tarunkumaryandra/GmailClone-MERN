import API from '../services/api';
import { useState } from 'react';


const useApi = (urlObject) => {
    const [response, setResponse] = useState(null);
    const[error, setError] = useState("");
    const [isLoading,SetIsLoading]=useState(false);


    const call = async (payload,type ='') => {
        setResponse(null);
        setError("");
        SetIsLoading(true);

        try {
            let res= await API(urlObject,payload,type);
            setResponse(res.data);
        }catch(error){
            setError(error.message);
        }finally{
            SetIsLoading(false);
        }

        
    }
    return { call, response, error, isLoading};
}

export default useApi;