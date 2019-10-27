import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import colors from '../../colors';

class CameraScreen extends PureComponent {
    
  constructor(props) {
        super(props);
        this.state = {
          encodedPicture: ''
        };
    }

  render() {
    
    return (
        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes);
            }}
          />
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 22, borderWidth: 1, borderColor: 'black', backgroundColor: colors.orange , color: 'white', padding: 16, borderRadius: 5 }}> Capture </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    takePicture = async() => {
      if (this.camera) {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync(options);
        this.setState({
          encodedPicture: data,
        });
        this.props.navigation.navigate('ImagePreviewScreen', {encodedPicture: data});
        
    }
}}

  export default connect(
      (state) => {
          return {
              user: state.user
          }
      }
  )( CameraScreen );


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'white',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
});
  
