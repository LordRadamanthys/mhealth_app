import GymsInterface from "../interfaces/GymsInterface";
import TrainingInterface from "../interfaces/TrainingInterface";
import UserInterface from "../interfaces/UserInterface";
import api from "../services/api";



export async function getTraining(gym: GymsInterface, user: UserInterface) {
    let response = null
    let error = null


    await api.get(`training/${gym.id}`, {
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





export async function insertTraining(data: {}, user: UserInterface) {
    let response = null
    let error = null

    var obj = {
        name_training: data.name_training,
        number_series: Number(data.number_series),
        number_moviments: Number(data.number_moviments),
    }

    console.log(obj)
    await api.patch(`gym/${data.id_gym}/${data.day}`, obj, {
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