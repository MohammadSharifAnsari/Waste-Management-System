import axios from "axios";

const BASEURL='http://localhost:7000/api/v1'

const axiosInstance=axios.create();

axiosInstance.defaults.baseURL=BASEURL;
axiosInstance.defaults.withCredentials=true;

export default axiosInstance;
