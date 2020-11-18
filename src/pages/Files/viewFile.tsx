
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview';
import PDFReader from 'rn-pdf-reader-js'
import Header from '../../components/Header';
import { Feather as Icon } from '@expo/vector-icons'
import LoadingModal from '../../components/Loading';
const iconRightHeader = <Icon name="plus" size={35} color="#FFC633" />
const ViewFile = () => {
    const [showLoading, setShowLoading] = useState(false)

    return (
        <View style={styles.container}>
            <Header textCenter="" itemRight={<></>} funcItemRight={() => { }} />
            <LoadingModal setShow={() => setShowLoading(!showLoading)} show={showLoading} />
            <PDFReader
                source={{
                    uri: 'https://www.eso.org/public/archives/presskits/pdf/presskit_0001.pdf',
                }}
                webviewStyle={{ flex: 1 }}

                onLoad={() => setShowLoading(true)}
                onLoadEnd={()=>setShowLoading(false)}
                useGoogleReader={true}
            />
        </View>
    )
}

export default ViewFile
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D2541',
        paddingTop: 40,
    },
})

// <WebView
        //     originWhitelist={['*']}
        //     bounces={false}
        //     useWebKit={true}
        //     scrollEnabled={true}
        //     javaScriptEnabled={true}
        //     allowFileAccess={true}
        //     allowFileAccessFromFileURLs={true}
        //     style={{ flex: 1 }}
        //     source={{ uri: 'https://www.eso.org/public/archives/presskits/pdf/presskit_0001.pdf' }}
        // />