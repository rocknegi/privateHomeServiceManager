import React from 'react'
import { View, Text } from 'react-native'
import { createAppContainer, createSwitchNavigator, SafeAreaView } from 'react-navigation'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icon name="rocket" size={30} color="#900" />;
Icon.loadFont()
const Login = ({navigation})=>{
  return(
    <SafeAreaView>
      <Text>Login Screen</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')}>
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const Dashboard = ({navigation})=>{
  return(
    <SafeAreaView>
      <Text>Dashboard</Text>
      {myIcon}
      <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const AppNavigator = createSwitchNavigator({
  Login,
  Dashboard
})

const AppContainer = createAppContainer(AppNavigator)

export default App = ()=>{
  return(
    <AppContainer />
  )
}
