import React from 'react'
import { View, Text } from 'react-native'
import { createAppContainer, createSwitchNavigator, SafeAreaView } from 'react-navigation'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Login from './src/components/Login';
Icon.loadFont()


const Dashboard = ({navigation})=>{
  return(
    <SafeAreaView>
      <Text>Dashboard</Text>
      <Icon name="rocket" size={30} color="#900" onPress={()=>navigation.openDrawer()}/>
      <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

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
