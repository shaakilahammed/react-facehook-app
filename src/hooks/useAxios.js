import axios from 'axios';
import { useEffect } from 'react';
import api from '../api';
import useAuth from './useAuth';

const useAxios = () => {
    const { auth, setAuth } = useAuth();
    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                const authToken = auth?.token?.token;
                if (authToken) {
                    config.headers.Authorization = `Bearer ${authToken}`;
                }
                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        );

        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if ((error.response.status = 401 && !originalRequest._retry)) {
                    originalRequest._retry = true;
                    const refreshToken = auth?.token?.refreshToken;
                    const response = await axios.post(
                        `${import.meta.env.VITE_BASE_URL}/auth/refresh-token`,
                        { refreshToken }
                    );
                    const { token } = response.data;
                    setAuth((prev) => ({
                        ...prev,
                        token: { ...prev.token, token },
                    }));

                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axios(originalRequest);
                }
                return Promise.reject(error);
            }
        );
        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [auth?.token?.refreshToken, auth?.token?.token, setAuth]);

    return { authorizedApi: api };
};

export default useAxios;
