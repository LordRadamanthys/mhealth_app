import React, { useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import examsIcon from '../../assets/images/exams.png'
import gymIcon from '../../assets/images/gym.png'
import vaccinesIcon from '../../assets/images/mask.png'
import medicinesIcon from '../../assets/images/medicines.png'
interface MainButtonInterface {
    text: string
    image: string
    action: Function
}



const MainButton: React.FC<MainButtonInterface> = ({ text, image, action, children }) => {

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

        <View style={styles.border}>
            <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={styles.recentActvities} onPress={() => action()}>
                <View style={styles.textsRecentActivities}>
                    <Text style={styles.textRecentActivitiesCard}>test te st ets te st ets e ts te </Text>
                    {children}
                </View>
                <Image source={selectImage(image)} style={styles.image} resizeMode='contain' />
            </RectButton>
        </View>
    )
}

const styles = StyleSheet.create({


    border: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E9585E',
        // backgroundColor:'#3D5089'
    },


    recentActivitiesContainer: {
        flexDirection: 'column',
        marginTop: 20
    },

    recentActvities: {

        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'space-between',
        borderRadius: 15
    },

    textsRecentActivities: {
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '70%',
    },

    textRecentActivitiesCard: {
        fontSize: 16,
        color: '#D8DFFD',
    },
    image: {
        marginStart: 10,
        width: 60,
        height: 60
    },
})

export default MainButton