import SpecialtiesInterface from "../interfaces/SpecialtyInterface";
import UserInterface from "../interfaces/UserInterface";
import api from "../services/api";



export async function getAllSpecialties(user: UserInterface) {
    let response = null
    let error = null
    await api.get(`speciality`, {
        headers: { 'Authorization': 'Bearer' + user.token }
    }).then(resp => {
        response = formatSpecialties(resp.data)
    }).catch(err => {
        error = err
    })

    if (response) {
        return response
    } else {
        throw (error)
    }
}


function formatSpecialties(data: [SpecialtiesInterface]) {

    const result = data.map(s => {
        return {
            label: s.name,
            value: s.id
        }
    })

    return result

}