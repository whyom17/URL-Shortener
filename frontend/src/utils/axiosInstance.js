import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 5000, 
    withCredentials: true,
});

// create error handler for my axios instance
axiosInstance.interceptors.response.use(
    response => response, // any status code within the range of 2xx cause this function to trigger
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 400:
                    console.error('Bad Request:', data.message || 'The request was invalid.');
                    break;
                case 401:
                    console.error('Unauthorized:', data.message || 'Authentication is required and has failed or has not yet been provided.');
                    break;
                case 403:
                    console.error('Forbidden:', data.message || 'You do not have permission to access this resource.');
                    break;
                case 404:
                    console.error('Not Found:', data.message || 'The requested resource was not found.');   
                    break;
                case 500:
                    console.error('Internal Server Error:', data.message || 'An error occurred on the server.');
                    break;
                default:
                    console.error(`Error ${status}:`, data.message || 'An unexpected error occurred.');
            }
        }else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from server:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error in setting up request:', error.message);
        }

        // We can customize the error object before rejecting
        return Promise.reject(error);
    }
);

export default axiosInstance; 