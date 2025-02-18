import axios from "axios";


const api = axios.create({
    baseURL: "https://web-production-186a.up.railway.app/"
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refreshToken");
                const response = await axios.post(
                    "https://web-production-186a.up.railway.app/api/token/refresh/",
                    {
                        refresh: refreshToken
                    }
                );
                localStorage.setItem("accessToken", response.data.access);
                return api(originalRequest);
            } catch (err) {
                console.log("Refresh token expired. Please login again.");
                localStorage.clear();
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
