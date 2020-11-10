import UserInterface from "../interfaces/UserInterface";
import api from "../services/api";

export async function getExams(user: UserInterface) {
    let response = null
    let error = null
    await api.get(`exams/${user.id}`, {
        headers: { 'Authorization': 'Bearer' + user.token }
    }).then(resp => {
        response = resp.data
    }).catch(err => {
        error = err
    })

    if (response) {
        return response
    } else {
        throw(error)
    }
}