import UserInterface from "../interfaces/UserInterface";
import api from "../services/api";

export async function getExams(user: UserInterface) {
    let response = null

    let error = null
    await api.get(`medicalAppointment`, {

        headers: { 'Authorization': 'Bearer ' + user.token }
    }).then(resp => {
        response = resp.data.reverse()

    }).catch(err => {
        error = err
    })

    if (response) {
        return response
    } else {
        throw (error)
    }
}


export async function update(data: {}, user: UserInterface) {
    let response = null
    let error = null
    await api.put(`medicalAppointment`, data, {

        headers: { 'Authorization': 'Bearer ' + user.token },

    }).then(resp => {
        response = resp.data
    }).catch(err => {
        console.log(err.response.data);
        
        error = err.response.data
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
    await api.delete(`medicalAppointment/${id_exam}`, {
        headers: { 'Authorization': 'Bearer ' + user.token }
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
    console.log(data)
    await api.post(`medicalAppointment`, data, {

        headers: { 'Authorization': 'Bearer ' + user.token },

    }).then(resp => {
        response = resp.data
    }).catch(err => {
        console.log(err);
        
        error = 'Error'
    })

    if (response) {
        return response
    } else {
        throw (error)
    }
}

