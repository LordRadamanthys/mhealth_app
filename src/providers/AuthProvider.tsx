import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import UserInterface from '../interfaces/UserInterface'
import ProviderLoginInterface from '../interfaces/ProviderLoginInterface'
import api from '../services/api'
const AuthContext = createContext<ProviderLoginInterface>({} as ProviderLoginInterface)

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<UserInterface | null>(null)


    async function login(email: string, password: string) {
        const data = {
            email,
            password
        }
        let error = 'Erro de conexão'
        await api.post('login', data)
            .then(resp => {
                
                setUser(resp.data)
            }).catch(err => {
                try {
                    error = err.response.data.message
                } catch (error) {

                    error = err.message
                }
                throw (error)
            })
    }

  

    async function clearUser() {
        console.log(user.token );
        
        await api.post('logout',{}, {
            headers: { 'Authorization': 'Bearer' + user.token }
        }).then(response => {
            setUser(null)
        }).catch(error => {
            if (error.response.data.message) {
    
                throw (error.response.data.message)
            } else {
    
                throw ('Ops, tente novamente')
            }
    
        })
        await AsyncStorage.clear()
    }

    return (
        < AuthContext.Provider value={{ signed: !!user, user, login, clearUser }}>
            {children}
        </AuthContext.Provider >
    )
}

export default AuthContext