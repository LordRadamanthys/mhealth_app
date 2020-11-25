import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CollapsibleView from "@eliav2/react-native-collapsible-view"
import * as Animatable from 'react-native-animatable'
import examsIcon from '../../assets/images/medicines.png'
import gymIcon from '../../assets/images/gym.png'

interface ExpandCardInterface {
    image: string
    title: string
    description?: string
}

const ExpandCard: React.FC<ExpandCardInterface> = ({ image, title, description, children }) => {

    function selectImage(image: string) {
        switch (image) {
            case 'gym':
                return gymIcon
            case 'exam':
                return examsIcon
            default:
                return examsIcon
        }
    }

    return (
        <Animatable.View animation="fadeInUp" style={styles.containerButtons}>
            <CollapsibleView style={[styles.buttonFile, { backgroundColor: '#3D5089' }]}
                title={<Text style={[styles.text, styles.title]}>{title}</Text>}
                collapsibleContainerStyle={{ borderRadius: 5 }}
                noArrow={true}
                unmountOnCollapse={true}
            >
                <Animatable.Image animation="pulse" resizeMode={'center'} delay={800} source={selectImage(image)} style={styles.image} />
                {children}
                <Text style={[styles.text, styles.buttonTextDescription]}>{description}</Text>
            </CollapsibleView>
        </Animatable.View>
    )
}

export default ExpandCard

const styles = StyleSheet.create({
    containerButtons: {
        marginTop: 15,
    },
    text: {
        color: '#D8DFFD'
    },

    title: {
        fontSize: 18,
        alignSelf: 'center',
    },

    buttonTextDescription: {
        fontSize: 14,
        marginTop: 10,
        alignSelf: 'center',

    },
    image: {
        marginTop: 20,
        width: 60,
        height: 50,
        alignSelf: 'center'

    },
    buttonFile: {
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: 'center',
        flexDirection: 'column',
        width: 300
    },

})