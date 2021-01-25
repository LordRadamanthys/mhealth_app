import UserInterface from "../interfaces/UserInterface";
import api from "../services/api";


export async function getRecents(user: UserInterface) {
    let response = null
    let error = null

    try {
        await api.get(`recents`, {
            headers: { 'Authorization': 'Bearer' + user.token }
        }).then(resp => {
            response = resp.data
            return response
        }).catch(err => {
            return err
        })

       
    } catch (e) {
        return e
    }
    if (response) {
        return response
    } else {
        throw (error)
    }
}