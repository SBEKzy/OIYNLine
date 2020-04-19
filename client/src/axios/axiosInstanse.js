import axios from 'axios'

export default function setAxiosInstanse(token){
    return axios.create({
        baseURL : "http://localhost:8080/api/",
        timeout : 5000,
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    });
}
