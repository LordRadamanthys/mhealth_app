import React, { useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import examsIcon from '../../assets/images/exams.png'
import gymIcon from '../../assets/images/gym.png'
import vaccinesIcon from '../../assets/images/mask.png'
import medicinesIcon from '../../assets/images/medicines.png'
import * as Animatable from 'react-native-animatable'

interface ButtonHomeInterface {
    text: string
    image: string
    action: Function
}



const ButtonHome: React.FC<ButtonHomeInterface> = ({ text, image, action, children }) => {

    function selectImage(name: string) {
        switch (name) {
            case 'gym':
                return gymIcon

            case 'exams':
                return examsIcon

            case 'vaccines':
                return vaccinesIcon

            case 'medicines':
                return medicinesIcon

            default:
                break;
        }
    }

    return (

        <Animatable.View animation="fadeInUp"  style={styles.border}>
            <RectButton style={styles.container} activeOpacity={0.9} rippleColor={'#fff'} onPress={()=>action()} >
                <Text style={styles.text}>{text}</Text>
                <Animatable.Image  animation="pulse"
                            iterationDelay={1000}
                            iterationCount="infinite"  source={selectImage(image)} style={{ width: 90, height: 70 }} resizeMode="contain" />
            </RectButton>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container: {
        // paddingVertical: 30,
        paddingHorizontal: 20,
        maxWidth: 200,
        width: 140,
        height: 150,
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#6562ff',

    },

    border: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#6562ff',
        marginHorizontal: 20
    },
    text: {
        color: '#D8DFFD',
        fontSize: 19,
        marginVertical: 20,
        fontFamily: 'Nunito_600SemiBold'
    },
})

export default ButtonHome