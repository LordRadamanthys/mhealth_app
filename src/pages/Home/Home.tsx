import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import TextInputCustom from '../../components/TextInput'
import HeaderHome from '../../components/HeaderHome'
import { RectButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import examsIcon from '../../assets/images/exams.png'
import ButtonHome from '../../components/ButtonsHome'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'
import RecentsInterface from '../../interfaces/RecentsInterface'
import Carousel from 'react-native-snap-carousel'
import gymIcon from '../../assets/images/gym.png'
import vaccinesIcon from '../../assets/images/mask.png'
import medicinesIcon from '../../assets/images/medicines.png'
import AuthContext from '../../providers/AuthProvider'
import { getRecents } from '../../controller/RecentController'
import RecentInterface from '../../interfaces/RecentInterface'
import LoadingModal from '../../components/Loading'

const Home = () => {
    const navigate = useNavigation()
    const { user } = useContext(AuthContext)
    const [carouselItems, setCarouselItems] = useState([])
    const [progressIndicator, setProgressIndicator] = useState(false)


    function goTo(page: string) {
        navigate.navigate(page)
    }


    function goToPageItem(itemPage: RecentsInterface) {
        switch (itemPage.type) {
            case 'exams':
                return navigate.navigate('Exams')
            case 'gym':
                return navigate.navigate('Gyms')
            case 'vaccines':
                return navigate.navigate('Vaccines')
            default:
                break;
        }
    }

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
                return medicinesIcon
        }
    }


    async function loadRecents() {
        setProgressIndicator(true)
        await getRecents(user).then((response: RecentInterface) => {
            setCarouselItems(response)
           
            return setProgressIndicator(false)
        }).catch(error => {
            
            return setProgressIndicator(false)
        })
    }

    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.border}>
                <RectButton activeOpacity={0.9} rippleColor={'#fff'} style={styles.recentActvities} onPress={() => goToPageItem(item)}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ flexDirection: 'column', marginHorizontal: 10, maxWidth:220 }}>
                            {item.title ? <Text style={[styles.text, styles.descriptionSlide, { fontSize: 23 }]}>{item.title}</Text> : undefined}
                            {item.date ? <Text style={[styles.text, styles.descriptionSlide]}>{`Data: ${item.date}`}</Text> : <></>}
                            {item.doctors_name ? <Text style={[styles.text, styles.descriptionSlide]}>{`Doutor(a): ${item.doctors_name}`}</Text> : <></>}
                            {item.local ? <Text style={[styles.text, styles.descriptionSlide]}>{`Local: ${item.local}`}</Text> : <></>}
                            {item.day ? <Text style={[styles.text, styles.descriptionSlide, {}]}>{`Dias: ${item.day}`}</Text> : <></>}
                        </View>
                        <Animatable.Image
                            animation="pulse"
                            iterationDelay={1000}
                            iterationCount="infinite"
                            source={selectImage(item.type)}
                            style={{ width: 70, height: 70, alignSelf: 'flex-start' }}
                            resizeMode="contain"
                        />
                    </View>
                </RectButton>
            </View>
        )
    }

    useFocusEffect(
        React.useCallback(() => {
            loadRecents()
            return () => { };
        }, [])
    )

    useEffect(() => {
        loadRecents()
    }, [])

    return (
        <View style={styles.container}>
            <HeaderHome funcItemRight={() => navigate.navigate("Profile")} />
            <View style={styles.containerInputSearch}>
                <TextInputCustom title="Search" value="" security={false} icon="search" onTextChangeFunc={() => { }} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.main}>
                    {carouselItems.length > 0 ?
                        <Animatable.View animation="fadeInUpBig" style={styles.recentActivitiesContainer}>
                            <Text style={[styles.text, { fontSize: 19, marginBottom: 10 }]}>Recent activities</Text>

                            <View style={{ maxHeight: 150 }}>
                                <Carousel
                                    layout={'stack'}
                                    layoutCardOffset={10}
                                    autoplay={true}
                                    autoplayInterval={5000}
                                    loop={true}
                                    data={carouselItems}
                                    renderItem={_renderItem}
                                    sliderWidth={360}
                                    sliderHeight={100}
                                    itemWidth={330}
                                    itemHeight={100}
                                />
                            </View>
                        </Animatable.View > :
                        <LoadingModal setShow={() => setProgressIndicator(progressIndicator)} show={progressIndicator} />
                    }


                    <View style={styles.mainButtons}>
                        <ButtonHome text="Exams" action={() => goTo('Exams')} image="exams" />
                        <ButtonHome text="Gym" action={() => goTo('Gyms')} image="gym" />
                    </View>
                    <View style={styles.mainButtons}>
                        <ButtonHome text="Vaccines" action={() => goTo('Vaccines')} image="vaccines" />
                        <ButtonHome text="Medicines" action={() => goTo('Medicines')} image="medicines" />
                    </View>

                </View>

            </ScrollView>
        </View >
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1f',
        paddingTop: 20,
    },

    containerInputSearch: {
        marginHorizontal: 20,
        marginTop: 10
    },

    main: {
        marginVertical: 0,
        padding: 5,
        alignItems: 'center',
    },

    recentActivitiesContainer: {
        flexDirection: 'column',
        marginTop: 20,

    },


    recentActvities: {
        alignItems: 'center',

        borderRadius: 10,
        padding: 20,
        minHeight: 130,
        backgroundColor: '#1a1a1f'
    },

    border: {
        borderColor: '#6562ff',
        borderWidth: 2,
        borderRadius: 15,
    },

    textsRecentActivities: {
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '70%',
        fontFamily: 'Nunito_600SemiBold'
    },

    text: {
        color: '#D8DFFD',
        fontFamily: 'Nunito_400Regular'
    },
    descriptionSlide: {
        fontSize: 17,
        marginTop: 3,
        marginHorizontal: 10,
        fontFamily: 'Nunito_400Regular'

    },

    textRecentActivitiesCard: {
        fontSize: 16,
        fontFamily: 'Nunito_400Regular'
    },

    image: {
        marginStart: 10,
        width: 60,
        height: 60
    },
    mainButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        maxWidth: 400,
    }
})