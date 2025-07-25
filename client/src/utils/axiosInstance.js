import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 6000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            //Handle common errors globally
            if (error.response.status === 401) {
                //Rediredct to login page
                window.location.href = "/login";
            } else if (error.response.status === 500) {
                console.error("Server Error. Please try again later");
            }
        } else if (error.code === "ECONNABORTED") {
            console.log("Request timeout. Please try again");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
