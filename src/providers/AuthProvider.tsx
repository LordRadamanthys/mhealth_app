import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import UserInterface from '../interfaces/UserInterface'
import Axios from 'axios'
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

        await api.post('login', data)
            .then(resp => {
                setUser(resp.data)
            }).catch(err => {

                if (err.response.data.message) {
                    throw (err.response.data.message)
                }else{
                    throw (err.message)
                }
            })




    }

    async function clearUser() {
        setUser(null)
        await AsyncStorage.clear()
    }

    return (
        < AuthContext.Provider value={{ signed: !!user, user, login, clearUser }}>
            {children}
        </AuthContext.Provider >
    )
}

export default AuthContext