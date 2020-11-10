import React from 'react'
import { useContext } from "react";
import AuthContext from "../providers/AuthProvider";

const { user } = useContext(AuthContext)

const GetUser = () => {
    return (
        user
    )
}
export default GetUser