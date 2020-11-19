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
            console.log(resp);
        }).catch(error => {
            if (error.response.data.message) {
                throw (error.response.data.message)
            } else {
                throw ('Erro')
            }
        })
}



export async function sendPinForgotPassword(pin: string) {

    const data = {
        pin
    }

    await api.post('/user/reset_password/verify_pin', data)
        .then(resp => {
           // console.log({ pin: resp.data.pin, id: resp.data.id });
const data ={ pin: resp.data.pin, id: resp.data.id }
            return data
        }).catch(error => {
            if (error.response.data.message) {
                throw (error.response.data.message)
            } else {
                throw ('Erro')
            }
        })
}



export async function changeForgotPassword(password: string, pin: number, id: number) {
    console.log(password, pin, id);

    const data = {
        new_password: password,
        pin: pin,
        id: id
    }

    await api.post('/user/reset_password', data)
        .then(resp => {
            console.log(resp);

            // return resp.data.pin
        }).catch(error => {
            console.log(error);
            // if (error.response.data.message) {
            //     throw (error.response.data.message)
            // } else {
            //     throw ('Erro')
            // }
        })
}