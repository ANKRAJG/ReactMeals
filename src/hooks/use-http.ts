import { useCallback, useState } from "react";

export interface RequestConfigObj {
    url: string;
    method?: string;
    body?: any;
    headers?: HeadersInit;
};

const useHttp = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    // Wrapped sendRequest inside useCallback as this function is used inside useEffect of Meals and AdminMeals Components.
    // Therefore, doesn't any unnecessary infinite re-render of component.
    const sendRequest = useCallback(async (requestConfig: RequestConfigObj, applyData: (data: any) => void) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                requestConfig.url, {
                    method: requestConfig.method ? requestConfig.method : 'GET',
                    headers: requestConfig.headers ? requestConfig.headers : {},
                    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
                }
            );
    
            if(!response.ok) {
                throw new Error('Something went wrong!');
            }
    
            const data = await response.json();
            applyData(data);
        } 
        catch (err: any) {
            setError(err.message || 'Something went wrong');
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest
    };
};

export default useHttp;