import axios from "axios";

const url = "http://localhost:3000/auth"
export default class UserService {

    static login(body) {
        return axios.post(url + "/login", body)
    }

    static registration(body) {
        return axios.post(url + "/registration", body)
    }
}