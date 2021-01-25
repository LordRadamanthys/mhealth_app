import { ExamsInterface } from "../interfaces/ExamsInterface";
import MedicineInterface from "../interfaces/MedicinesInterface";
import UserInterface from "../interfaces/UserInterface";
import api from "../services/api";

export async function getMedicine(idExam: string, user: UserInterface) {
    let response = null
    let error = null


    await api.get(`medicines/${idExam}`, {
        headers: { 'Authorization': 'Bearer' + user.token }
    }).then(resp => {
        response = resp.data
        console.log(response);
    }).catch(err => {
        error = err
    })

    if (response) {
        return response.reverse()
    } else {
        throw (error)
    }
}

export async function getAllMedicine(user: UserInterface) {
    let response = null
    let error = null


    await api.get(`medicines`, {
        headers: { 'Authorization': 'Bearer' + user.token }
    }).then(resp => {
        response = resp.data
    }).catch(err => {
        error = err
    })

    if (response) {
        return response.reverse()
    } else {
        throw (error)
    }

}


export async function createMedicine(data:{}, user: UserInterface) {
    let response = null
    let error = null


    await api.post(`medicines`, data,{
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

export async function formatExams(response: [ExamsInterface]) {
    const list = await response.map(exam => {
        return {
            value: exam.id,
            label: exam.title
        }
    })
    console.log(list);


    return list

}