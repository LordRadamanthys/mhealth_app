import api from "../services/api";

export async function login() {
    await api.post("login", {
        name: 'mateus',
        email: 'mateus@teste.com',
        password: 1234
    }).then(response => {
        console.log(response.data);
    }).catch(error => {
        console.log(error);
    })
}