import UserInterface from "../interfaces/UserInterface";
import api from "../services/api";


export async function getRecents(user: UserInterface) {
    let response = null
    let error = null


    await api.get(`recents`, {
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