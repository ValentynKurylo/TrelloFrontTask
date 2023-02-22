import axios from "axios";

const url = "http://localhost:3000"
export default class UserService {

    static getByStatus(query) {
        return axios.get(`${url}/task/status?status=${query}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }

    static addTask(body) {
        return axios.post(`${url}/task`, body,{
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }

    static getTaskById(id) {
        return axios.get(`${url}/task/byId/${id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }
    static getSubTaskByTaskId(id) {
        return axios.get(`${url}/sub-task/task/${id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }
    static getSubTaskById(id) {
        return axios.get(`${url}/sub-task/byId/${id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }

    static addSubTask(body) {
        return axios.post(`${url}/sub-task`, body,{
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }
    static patchTask(id, body) {
        return axios.patch(`${url}/task/${id}`, body, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }
    static patchSubTask(id, body) {
        console.log('sssssssss')
        return axios.patch(`${url}/sub-task/${id}`, body, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }
    static deleteTaskById(id) {
        return axios.delete(`${url}/task/${id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }
    static deleteSubTaskById(id) {
        return axios.delete(`${url}/sub-task/${id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }

}