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
        let error = 'Network error'
        await api.post('login', data)
            .then(resp => {
                storeData(email, password)
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

    const storeData = async (email: string, password: string) => {
        try {
            await AsyncStorage.setItem('@email', email)
            await AsyncStorage.setItem('@password', password)
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
            const email = await AsyncStorage.getItem('@email')
            const password = await AsyncStorage.getItem('@password')
            if (email !== null && password !== null) {
                login(email, password)
            }

        } catch (e) {
            // error reading value
        }
    }

    async function cleanPreferences() {
        await AsyncStorage.clear()
    }


    async function clearUser() {
        console.log(user.token);

        await api.post('logout', {}, {
            headers: { 'Authorization': 'Bearer' + user.token }
        }).then(response => {
            setUser(null)
            cleanPreferences()
        }).catch(error => {
            if (error.response.data.message) {

                throw (error.response.data.message)
            } else {

                throw ('Oops, try again')
            }

        })
        await AsyncStorage.clear()
    }

    return (
        < AuthContext.Provider value={{ signed: !!user, user, login, clearUser, getData }}>
            {children}
        </AuthContext.Provider >
    )
}

export default AuthContext