import React from 'react'
import UserInterface from "../interfaces/UserInterface"
import api from "../services/api"

export async function getFilesExam(id: number, user: UserInterface) {

    let response = null
    let error = null
    await api.get(`exams/file/${id}`, {
        headers: { 'Authorization': 'Bearer' + user.token }
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


export async function getFile(data: {}, user: UserInterface) {
    let response = null
    let error = null
    await api.get(`file/exams`, {
        headers: { 'Authorization': 'Bearer' + user.token }
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




export async function deleteFile(data: {}, user: UserInterface) {
    let response = null
    let error = null
    await api.delete(`exams/file`, {
        data,
        headers: { 'Authorization': 'Bearer' + user.token }
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