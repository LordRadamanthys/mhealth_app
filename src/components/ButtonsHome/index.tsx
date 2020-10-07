import React from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import examsIcon from '../../assets/images/relatorio_medico.png'
interface ButtonHomeInterface {
    text: string
    image: string
    action: Function
}


const ButtonHome: React.FC<ButtonHomeInterface> = ({ text, image, action, children }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Text>{text}</Text>
            <Image source={examsIcon} style={{ width: 70, height: 70 }} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding:30,
        flexDirection: 'column',
        alignItems:'center',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#E9585E'
    }
})

export default ButtonHome