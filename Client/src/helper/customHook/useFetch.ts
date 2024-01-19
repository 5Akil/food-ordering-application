
import { useRouter } from 'next/navigation';

export { useFetch }

function useFetch() {
    const router = useRouter();

    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE')
    };

    function request(method: string) {
        return (url: string, body?: any) => {

            const requestOptions: any = {
                method
            };
            const token = getToken()
            // If a token exists, add it to the headers
            if (token) {
                requestOptions.headers = { ...requestOptions.headers, 'authorization': `Bearer ${token}` };
            }
            if (body) {
                requestOptions.headers = { ...requestOptions.headers, 'Content-Type': 'application/json' };
                requestOptions.body = JSON.stringify(body);
            }
            //base url fro api
            const baseUrl = `${process.env.NEXT_PUBLIC_BASE_API_BACKEND_URL}`
            url = baseUrl + url
            return fetch(url, requestOptions).then(handleResponse);
        }
    }
    // helper functions
    async function handleResponse(response: any) {
        const isJson = response.headers?.get('content-type')?.includes('application/json');
        const data = isJson ? await response.json() : null;
        // check for error response
        if (!response.ok) {
            if (response.status === 401) {
                // api auto logs out on 401 Unauthorized, so redirect to login page
                router.push('/login');
            }
            // get error message from body or default to response status
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    }
}
const getToken = () => {
    const userJson = localStorage.getItem('user')
    const user = userJson ? JSON.parse(userJson) : null;
    const token = user ? user.accessToken : null;

    return token;
}