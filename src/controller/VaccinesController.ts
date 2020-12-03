import UserInterface from "../interfaces/UserInterface"
import api from "../services/api"


export async function getVaccines(user: UserInterface) {
    let response: [] = []
    let error = null


    await api.get(`vaccines`, {
        headers: { 'Authorization': 'Bearer' + user.token }
    }).then(resp => {
      //  console.log(resp.data);
        
        response = resp.data

    }).catch(err => {
        //console.log(err);
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

export async function updateVaccine(data: {}, user: UserInterface) {
    let response = null
    let error = null


    await api.put(`vaccines`, data, {
        headers: { 'Authorization': 'Bearer' + user.token }
    }).then(resp => {
        //console.log(resp.data);
        
        response = resp.data

    }).catch(err => {
       // console.log(err);
        
        error = err
    })

    if (response) {
        return response
    } else {
        throw (error)
    }
}


export async function deleteVaccineAndFiles(id_vaccine: number, user: UserInterface) {
    let response = null
    let error = null


    await api.delete(`vaccines/${id_vaccine}`, {
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