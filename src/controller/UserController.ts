import api from "../services/api";
import { verifyEmail, verifyPassword } from "../utils/VerifyFields";


export async function createUser(name: string, email: string, password: string) {
    if (!verifyPassword(password)) throw ('Senha fraca')
    const newName = name.toLocaleLowerCase()
    const newEmail = email.toLocaleLowerCase()
    if (!verifyEmail(newEmail)) throw ('E-mail invalido')
    const data = {
        name: newName,
        email: newEmail,
        password: password
    }



    await api.post('user', data)
        .then(response => {
            return 'Usuario criado'
        }).catch(error => {
            if (error.response.data.message) {

                throw (error.response.data.message)
            } else {

                throw ('Ops, tente novamente')
            }

        })
}