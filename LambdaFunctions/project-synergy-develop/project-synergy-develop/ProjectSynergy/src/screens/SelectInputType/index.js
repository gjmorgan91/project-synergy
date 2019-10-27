import React from 'react';
import colors from '../../colors';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

export default class SelectInputTypeScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 40 }}>
                    <Text style={{textAlign: 'center', fontSize: 20}}>Would you like to take a photo or upload an image?</Text>
                </View>
                <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }} >
                    <TouchableOpacity style={{ backgroundColor: colors.orange, width: 300, marginTop: 100, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} onPress={() => {
                        this.props.navigation.navigate('CameraScreen');
                    }}>
                        <Text style={{ color: 'white' }}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: colors.orange, width: 300, marginTop: 30, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} onPress={() => {
                        this.props.navigation.navigate('ResultsScreen');
                    }}>
                        <Text style={{ color: 'white' }}>Upload Image</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}