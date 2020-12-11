import UserInterface from "../interfaces/UserInterface";
import api from "../services/api";

export async function getGyms(user: UserInterface) {
    let response = null
    let error = null


    await api.get(`gym`, {
        headers: { 'Authorization': 'Bearer' + user.token }
    }).then(resp => {
        response = resp.data

    }).catch(err => {
        error = err
    })

    if (response) {
        return response.reverse()
    } else {
        throw (error)
    }
}

export async function insertGym(data: {}, user: UserInterface) {
    let response = null
    let error = null


    await api.post(`gym`, data,{
        
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