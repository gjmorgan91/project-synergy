import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import configureStore from './src/redux/configureStore';

import DashboardScreen from './src/screens/Dashboard/index';
import CameraScreen from './src/screens/Camera/index';
import ResultsScreen from './src/screens/Results/index';
import SelectInputTypeScreen from './src/screens/SelectInputType/index';
import ImagePreviewScreen from './src/screens/ImagePreview/index';
import EstimateScreen from './src/screens/ImagePreview/index';



const AppNavigator = createStackNavigator(
  {
    DashboardScreen: DashboardScreen,
    CameraScreen: CameraScreen,
    ResultsScreen: ResultsScreen,
    SelectInputTypeScreen: SelectInputTypeScreen,
    ImagePreviewScreen: ImagePreviewScreen,
    EstimateScreen: EstimateScreen
  },
  {
    initialRouteName: 'DashboardScreen',
  }
);


const Navigation = createAppContainer(AppNavigator);
const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <Navigation />
      </Provider>
    )
  }
}
