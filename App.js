import React from 'react'
import { View, Text } from 'react-native'
import { createAppContainer, createSwitchNavigator, SafeAreaView } from 'react-navigation'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Login from './src/components/Login';
import Dashboard from './src/components/Dashboard';
import landingPage from './src/components/LandingPage';
import Account from './src/components/Account';
Icon.loadFont()

const DrawerNavigation = createDrawerNavigator({
  Dashboard,
  Account
})

const AppNavigator = createSwitchNavigator({
  landingPage,
  Login,
  Dashboard : DrawerNavigation
},{
  initialRouteName:'Dashboard'
})

const AppContainer = createAppContainer(AppNavigator)

export default App = ()=>{
  return(
    <AppContainer />
  )
}
