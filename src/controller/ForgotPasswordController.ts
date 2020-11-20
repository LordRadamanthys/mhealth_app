import UserInterface from "../interfaces/UserInterface";
import api from "../services/api";
import { verifyEmail } from "../utils/VerifyFields";


export async function sendEmailForgotPassword(email: string) {
    if (!verifyEmail(email)) throw ('E-mail invalido')
    const data = {
        email
    }

    await api.post('user/reset_password/verify_email', data)
        .then(resp => {
            //console.log(resp);
        }).catch(error => {
            try {
                if (error.response.data.message) {
                    throw (error.response.data.message)
                } else {
                    throw ('Erro')
                }
            } catch (err) {
                throw ('Erro')
            }
        })
}



export async function sendPinForgotPassword(pin: string) {

    const data = {
        pin
    }
    let response = null
    let error = ''

    await api.post('/user/reset_password/verify_pin', data)
        .then(resp => {
            response = { pin: resp.data.pin, id: resp.data.id }

        }).catch(err => {
            if (err.response.data.message) {
                error = err.response.data.message
            } else {
                error = 'Erro'
            }
        })
    return response ? response : error
}



export async function changeForgotPassword(password: string, pin: number, id: number) {

    const data = {
        new_password: password,
        pin: pin,
        id: id
    }

    let response = null
    let error = ''

    await api.post('/user/reset_password', data)
        .then(resp => {
            console.log(resp);

            response = resp.data.message
        }).catch(err => {
            console.log(err);
            if (err.response.data.message) {
                error = err.response.data.message
            } else {
                error = 'Erro'
            }
        })

    if (response != null) {
        return response
    } else {
        throw (error)
    }
}