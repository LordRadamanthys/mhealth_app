import UserInterface from "../interfaces/UserInterface";
import api from "../services/api";

export async function getFilesVaccine(id: number, user: UserInterface) {
    let response: [] = []
    let error = null


    await api.get(`vaccines/file/${id}`, {
        headers: { 'Authorization': 'Bearer' + user.token }
    }).then(resp => {
        response = resp.data

    }).catch(err => {
        console.log(err);
        error = err
    })

    if (response) {
        return response.reverse()
    } else {
        throw (error)
    }
}


export async function deleteFileVaccine(data: {}, user: UserInterface) {
    let response = null
    let error = null
    await api.delete(`vaccines/file`, {
        data,
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