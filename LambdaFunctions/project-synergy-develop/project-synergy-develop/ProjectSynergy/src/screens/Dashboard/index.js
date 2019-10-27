import React from 'react';
import { connect } from 'react-redux';
import colors from '../../colors';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
  } from 'react-native';

class DashboardScreen extends React.Component {
    render() {
      return (
          <SafeAreaView style={{flex: 1 }}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                resizeMode='contain'
                style={{width: 200}}
                source={require('../../../vws.jpg')}
              />
            </View>
            <View style={{flex: 3, alignItems: 'center', justifyContent: 'flex-start'}} >
              <TouchableOpacity style={{backgroundColor: colors.orange, width: 300, marginTop: 100, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5}} onPress={() => {
                this.props.navigation.navigate('SelectInputTypeScreen');
              }}>
                <Text style={{color: 'white'}}>New Inventory</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: colors.orange, width: 300, marginTop: 30, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} onPress={() => {
                this.props.navigation.navigate('ResultsScreen');
              }}>
                <Text style={{ color: 'white' }}>Previous Inventories</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
      );
    }
  }
  export default connect(
    (state) => {
        return {
            
        }
    },
    {  }
)( DashboardScreen );


  const styles = StyleSheet.create({
  });
  

