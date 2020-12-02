import UserInterface from "../interfaces/UserInterface"
import api from "../services/api"


export async function getVaccines(user: UserInterface) {
    let response: [] = []
    let error = null


    await api.get(`vaccines`, {
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



export async function insertVaccine(data: {}, user: UserInterface) {
    let response = null
    let error = null


    await api.post(`vaccines`, data, {
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