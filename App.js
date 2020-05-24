import React from 'react'
import { View, Text } from 'react-native'
import { createAppContainer, createSwitchNavigator, SafeAreaView } from 'react-navigation'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Login from './src/components/Login';
import Dashboard from './src/components/Dashboard';
Icon.loadFont()

const DrawerNavigation = createDrawerNavigator({
  Dashboard
})

const AppNavigator = createSwitchNavigator({
  Login,
  Dashboard : DrawerNavigation
})

const AppContainer = createAppContainer(AppNavigator)

export default App = ()=>{
  return(
    <AppContainer />
  )
}
