import React from 'react';
import { View, Text, ImageBackground, Image, Dimensions, TextInput, TouchableOpacity, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header } from 'react-navigation-stack';
import { postPicture } from '../../redux/reducers';
import { connect } from 'react-redux';
import axios from 'axios';
import colors from '../../colors';



class ImagePreviewScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fileName: '',
            base64: this.props.navigation.getParam('encodedPicture')
        }
    }

    onChangeText(fileName) {
        this.setState({
            fileName: fileName
        }, () => {})
    }

    async saveImage(state){
        const body = {filename: state.fileName, base64: state.base64.base64}
        const jsonBody = JSON.stringify(body);
        
        const res = await axios.post('https://reaeqznkw4.execute-api.us-east-2.amazonaws.com/dev/s3-input-to-rekognition', {
            filename: state.fileName, 
            base64: state.base64.base64
        })

        this.props.navigation.navigate('ResultsScreen', {body: state.base64, res: res})
};



    render() {
        // const source = 
        const heightToWidthRatio = this.props.navigation.getParam('encodedPicture').height / this.props.navigation.getParam('encodedPicture').width;
        const screenWidth = Dimensions.get('window').width;
        const scaledHeight = screenWidth * heightToWidthRatio;
        
        

        return (
            <View>
                <KeyboardAwareScrollView extraScrollHeight={Header.HEIGHT + 40}>
                <Image
                    source={{uri: this.props.navigation.getParam('encodedPicture').uri}}
                    style={{ width: screenWidth, height: scaledHeight }}
                />
                <TextInput onChangeText={text => this.onChangeText(text)} style={{height: 40, borderWidth: 1, borderColor: 'black', paddingVertical: 5, paddingLeft: 10, color: 'black', alignItems: 'center', textAlign: 'center', alignSelf: 'center', width: 300, borderRadius: 5, color: 'black', marginTop: 17}} placeholder= 'Name your picture' placeholderTextColor='light gray'/>
                <TouchableOpacity onPress={() => this.saveImage(this.state)} style={{height: 40, borderWidth: 1, borderColor: 'black', paddingLeft: 10, backgroundColor: colors.blue, marginTop: 10, width: 300, borderRadius: 5, alignSelf: 'center'}}><Text style={{alignSelf: 'center', textAlign: 'center', color: 'white', paddingVertical: 8, fontWeight: 'bold', fontSize: 17}}>SAVE</Text></TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>
        )
    }
} export default connect(
    (state) => {
        return {
            
        }
    },
    { postPicture }
)( ImagePreviewScreen );

