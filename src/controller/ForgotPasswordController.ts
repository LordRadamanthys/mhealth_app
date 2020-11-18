import UserInterface from "../interfaces/UserInterface";
import api from "../services/api";


export async function sendEmailForgotPassword(email: string) {
    const data = {
        email
    }

    await api.post('user/reset_password/verify_email', data)
        .then(resp => {
            console.log(resp);
        }).catch(error => {
            if(error.response.data.message){
                throw(error.response.data.message)
            }else{
                throw('Erro')
            }
        })
}



export async function sendPinForgotPassword(pin: string) {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    
    const data = {
        pin
    }

    await api.post('/user/reset_password/verify_pin', data)
        .then(resp => {
            console.log(resp.data.pin);
            
            return resp.data.pin
        }).catch(error => {
            if(error.response.data.message){
                throw(error.response.data.message)
            }else{
                throw('Erro')
            }
        })
}