import UserInterface from "../interfaces/UserInterface";
import api from "../services/api";

export async function getExams(user: UserInterface) {
    let response = null
    let error = null
    await api.get(`exams`, {
        headers: { 'Authorization': 'Bearer' + user.token }
    }).then(resp => {
        response = resp.data
        
    }).catch(err => {
        error = err
    })

    if (response) {
        return response
    } else {
        throw (error)
    }
}


export async function deleteExamAndFiles(id_exam: number, user: UserInterface) {
    let response = null
    let error = null
    await api.delete(`exams/${id_exam}`, {
        headers: { 'Authorization': 'Bearer' + user.token }
    }).then(resp => {
        response = resp.data
    }).catch(err => {
        error = err
    })

    if (response) {
        return response
    } else {
        throw (error)
    }
}


export async function insert(data: {}, user: UserInterface) {
    let response = null
    let error = null
    await api.post(`exams`, data, {

        headers: { 'Authorization': 'Bearer' + user.token },

    }).then(resp => {
        response = resp.data
    }).catch(err => {
        error = err
    })

    if (response) {
        return response
    } else {
        throw (error)
    }
}
