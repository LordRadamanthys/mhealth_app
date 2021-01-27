import UserInterface from "../interfaces/UserInterface";
import api from "../services/api";
import { verifyEmail, verifyPassword } from "../utils/VerifyFields";


export async function createUser(name: string, email: string, password: string, image: any) {
    if (!verifyPassword(password)) throw ('Senha fraca')
    const newName = name.toLocaleLowerCase()
    const newEmail = email.toLocaleLowerCase()
    if (!verifyEmail(newEmail)) throw ('E-mail invalido')


    var data = new FormData()
    data.append('name', newName)
    data.append('email', newEmail)
    data.append('password', password)
    if (image) {
        data.append('image', {
            uri: image,
            name: `profile.jpg`,
            type: 'image/jpg'
        })
    }

    await api.post('user', data, {
        headers: {
            'Content-Type': 'Multipart/form-data'
        }
    }).then(response => {
        return 'Usuario criado'
    }).catch(error => {
        if (error.response.data.message) {

            throw (error.response.data.message)
        } else {

            throw ('Oops, try again later')
        }

    })

}


export async function updateUser(user: UserInterface, name: string, password: string, image: any) {
    if (password != "") {
        if (!verifyPassword(password)) throw ('Senha fraca')
    }

    try {
        var data = new FormData()
        data.append('name', name)
        data.append('password', password)

        if (image != '') {
            data.append('image', {
                uri: image,
                name: `profile.jpg`,
                type: 'image/jpg'
            })
        } else {
            image = ""
            data.append('image', image)
        }


        await api.put('user', data, {
            headers: { 'Authorization': 'Bearer' + user.token }
        }).then(response => {
            return 'Usuario atualizado'
        }).catch(error => {

            throw ('Oops, try again later')


        })
    } catch (e) {
        throw ('Oops, try again later')
    }
}
